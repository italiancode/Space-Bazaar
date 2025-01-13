import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  getRedirectResult,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  signInWithRedirect,
} from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { setCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";

interface CustomUser {
  uid: string;
  id: string;
  name: string;
  email: string;
  role: string;
  photoURL?: string;
}

interface AuthContextType {
  currentUser: CustomUser | null;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  isLoggingOut: boolean;
  isLoggingIn: boolean;
  user: CustomUser | null;
  loading: boolean;
  initiateAuth: (destination?: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<CustomUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Redirect to login page with the destination URL as a query parameter
  const initiateAuth = (destination?: string) => {
    const redirectUrl = destination || window.location.pathname;
    router.push(`/auth?callbackUrl=${encodeURIComponent(redirectUrl)}`);
  };

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        setCookie("auth-token", token);

        const user: CustomUser = {
          uid: firebaseUser.uid,
          id: firebaseUser.uid,
          name: firebaseUser.displayName || "",
          email: firebaseUser.email || "",
          role: "user",
          photoURL: firebaseUser.photoURL || undefined,
        };
        setCurrentUser(user);
        await updateUserInFirestore(user);

        const params = new URLSearchParams(window.location.search);
        const callbackUrl = params.get("callbackUrl");
        if (callbackUrl) {
          router.push(callbackUrl);
        }
      } else {
        setCurrentUser(null);
        deleteCookie("auth-token");
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [router]);

  // Update user information in Firestore
  const updateUserInFirestore = async (user: CustomUser) => {
    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          email: user.email,
          name: user.name,
          photoURL: user.photoURL,
          lastLogin: new Date().toISOString(),
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error updating user in Firestore:", error);
    }
  };

  const signInWithGoogle = async (): Promise<void> => {
    setIsLoggingIn(true);
    setAuthError(null);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user: CustomUser = {
        uid: result.user.uid,
        id: result.user.uid,
        name: result.user.displayName || "",
        email: result.user.email || "",
        role: "user",
        photoURL: result.user.photoURL || undefined,
      };
      await updateUserInFirestore(user);
    } catch (error) {
      console.error("Error signing in:", (error as FirebaseError).message);
      if ((error as FirebaseError).code === "auth/popup-blocked") {
        await signInWithRedirect(auth, provider);
      } else {
        setAuthError("Sign-in was unavailable. Please try again later.");
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle redirect result after OAuth login
  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          const user: CustomUser = {
            uid: result.user.uid,
            id: result.user.uid,
            name: result.user.displayName || "",
            email: result.user.email || "",
            role: "user",
            photoURL: result.user.photoURL || undefined,
          };
          await updateUserInFirestore(user);
        } else {
          initiateAuth();
        }
      } catch (error) {
        console.error("Error handling redirect result:", error);
      }
    };

    handleRedirectResult();
  }, []);

  // Logout function
  const logout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut(auth);
      window.location.reload();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const value = {
    currentUser,
    signInWithGoogle,
    initiateAuth,
    logout,
    isLoggingOut,
    isLoggingIn,
    user: currentUser,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
      {(isLoggingIn || isLoggingOut) && (
        <div className="fixed inset-0 bg-bg-primary/50 backdrop-blur-sm flex items-center justify-center z-[100]">
          <div className="bg-bg-secondary p-6 rounded-xl shadow-xl max-w-md w-full mx-4 border border-text-secondary/10">
            <h3 className="text-xl font-semibold text-accent mb-2">
              {isLoggingIn ? "Signing in..." : "Logging out..."}
            </h3>
            {authError ? (
              <p className="text-text-danger">{authError}</p>
            ) : (
              <p className="text-text-primary">
                {isLoggingIn
                  ? "Sign-in in progress. Please wait..."
                  : "Clearing all stored data and signing out. Please wait..."}
              </p>
            )}
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};
