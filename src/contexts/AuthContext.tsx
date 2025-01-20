import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  getRedirectResult,
  User,
} from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { setCookie, deleteCookie } from "cookies-next";
import { useRouter, usePathname } from "next/navigation";

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
  const router = useRouter();
  const pathname = usePathname();

  // Handle auth state changes
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Get user data from Firestore
          const userDoc = await getDoc(doc(db, "users", user.uid));
          const userData = userDoc.data();

          const transformedUser: CustomUser = {
            uid: user.uid,
            id: user.uid,
            name: user.displayName || userData?.name || "Anonymous",
            email: user.email || userData?.email || "",
            role: userData?.role || "user",
            photoURL: user.photoURL || userData?.photoURL,
          };

          setCurrentUser(transformedUser);
          setCookie("user", JSON.stringify(transformedUser), {
            maxAge: 30 * 24 * 60 * 60, // 30 days
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
          setCurrentUser(null);
          deleteCookie("user");
        }
      } else {
        setCurrentUser(null);
        deleteCookie("user");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        const user = result?.user as User;
        if (user) {
          const customUser: CustomUser = {
            uid: user.uid,
            id: user.uid,
            name: user.displayName || "",
            email: user.email || "",
            role: "user",
            photoURL: user.photoURL || undefined,
          };
          await updateUserInFirestore(customUser);
          setCurrentUser(customUser);
          setCookie("user", JSON.stringify(customUser), {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
          });

          const searchParams = new URLSearchParams(window.location.search);
          const returnUrl = searchParams.get("returnUrl");
          if (returnUrl && !returnUrl.includes("/auth")) {
            router.push(returnUrl);
          } else {
            router.push("/account");
          }
        }
      } catch (error) {
        console.error("Error handling redirect result:", error);
      }
    };

    handleRedirectResult();
  }, [router]);

  const signInWithGoogle = async (): Promise<void> => {
    if (isLoggingIn) return;

    try {
      setIsLoggingIn(true);
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: "select_account",
      });

      // Try popup first
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
        setCurrentUser(user);
        setCookie("user", JSON.stringify(user), {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        });

        const searchParams = new URLSearchParams(window.location.search);
        const returnUrl = searchParams.get("returnUrl");
        if (returnUrl && !returnUrl.includes("/auth")) {
          router.push(returnUrl);
        } else {
          router.push("/account");
        }
      } catch (popupError) {
        console.error("Popup error:", popupError);
        // await signInWithRedirect(auth, provider);
      }
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    } finally {
      setIsLoggingIn(false);
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
      throw error;
    }
  };

  const logout = async () => {
    try {
      setIsLoggingOut(true);
      await signOut(auth);
      deleteCookie("user");
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
