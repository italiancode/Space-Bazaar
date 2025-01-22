import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  signInWithRedirect,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  getRedirectResult,
  User,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { setCookie, deleteCookie } from "cookies-next";
import { useRouter, usePathname } from "next/navigation";
// import './AuthContext.css';

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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<CustomUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Handle auth state changes
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await handleUserAuthentication(user);
      } else {
        setCurrentUser(null);
        deleteCookie("user");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Handle Google redirect sign-in
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          handleUserAuthentication(result.user);
        }
      })
      .catch((error) => {
        console.error("Redirect sign-in error:", error);
      });
  }, []);

  const signInWithGoogle = async (): Promise<void> => {
    if (isLoggingIn) return;

    try {
      setIsLoggingIn(true);
      const provider = new GoogleAuthProvider();
      if (typeof window !== "undefined" && window.innerWidth < 768) {
        // Use redirect for mobile devices
        await signInWithRedirect(auth, provider);
      } else {
        // Use popup for desktop
        await signInWithPopup(auth, provider);
      }
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Helper function to handle user authentication
  const handleUserAuthentication = async (user: User) => {
    try {
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      const userData: CustomUser = {
        uid: user.uid,
        id: user.uid,
        name: user.displayName || userDoc.data()?.name || "Anonymous",
        email: user.email || userDoc.data()?.email || "",
        role: userDoc.exists() ? userDoc.data()?.role || "user" : "user",
        photoURL: user.photoURL || userDoc.data()?.photoURL,
      };

      await updateUserInFirestore(userData);
      setCurrentUser(userData);
      setCookie("user", JSON.stringify(userData), {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

      setNotice("Login successful!");
      setTimeout(() => setNotice(null), 3000);

      const searchParams = new URLSearchParams(window.location.search);
      const returnUrl = searchParams.get("returnUrl");
      if (returnUrl && !returnUrl.includes("/auth")) {
        router.push(returnUrl);
      } else {
        router.push("/account");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      setCurrentUser(null);
    }
  };

  const updateUserInFirestore = async (user: CustomUser) => {
    try {
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      const userData = {
        email: user.email || null,
        name: user.name || null,
        photoURL: user.photoURL || null,
        role: userDoc.exists() ? userDoc.data()?.role || "user" : "user",
        lastLogin: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...(userDoc.exists() ? {} : { createdAt: new Date().toISOString() }),
      };

      await setDoc(userRef, userData, { merge: true });
    } catch (error) {
      console.error("Error updating user in Firestore:", error);
    }
  };

  const logout = async () => {
    try {
      setIsLoggingOut(true);
      await signOut(auth);
      deleteCookie("user");
      setCurrentUser(null);
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const initiateAuth = useCallback(
    (destination?: string) => {
      if (!loading && !currentUser) {
        const returnPath = destination || pathname;
        router.push(`/auth?returnUrl=${encodeURIComponent(returnPath || "/")}`);
      }
    },
    [currentUser, loading, router, pathname]
  );

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
    <>
      {notice && <div className="notice">{notice}</div>}
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
}
