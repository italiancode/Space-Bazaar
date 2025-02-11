import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { setCookie, deleteCookie } from "cookies-next";
import { useRouter, usePathname } from "next/navigation";
// 
interface CustomUser {
  uid: string;
  id: string;
  name: string;
  email: string;
  role: string;
  photoURL?: string;
  avatar?: string;
}

interface AuthContextType {
  currentUser: CustomUser | null;
  signInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<void>;
  signUpWithEmailAndPassword: (
    email: string,
    password: string,
    name: string
  ) => Promise<void>;
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await handleUserAuthentication(user);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithEmailAndPasswordHandler = async (
    email: string,
    password: string
  ): Promise<void> => {
    if (isLoggingIn) return;
    try {
      setIsLoggingIn(true);

      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const signUpWithEmailAndPasswordHandler = async (
    email: string,
    password: string,
    name: string
  ): Promise<void> => {
    if (isLoggingIn) return;
    try {
      setIsLoggingIn(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userData: CustomUser = {
        uid: user.uid,
        id: user.uid,
        name: name,
        email: user.email || "",
        role: "user", // Default role for new users
      };
      await updateUserInFirestore(userData);
      setCurrentUser(userData);
      setCookie("user", JSON.stringify(userData), {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      redirectToReturnUrl();
    } catch (error) {
      console.error("Sign up error:", error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleUserAuthentication = async (user: User) => {
    try {
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);
      const userData: CustomUser = {
        uid: user.uid,
        id: user.uid,
        name: user.displayName || userDoc.data()?.name || "Anonymous",
        email: user.email || "",
        role: userDoc.exists() ? userDoc.data()?.role || "user" : "user",
        photoURL: user.photoURL || userDoc.data()?.photoURL,
      };

      await updateUserInFirestore(userData);
      setCurrentUser(userData);
      setCookie("user", JSON.stringify(userData), {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      redirectToReturnUrl();
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  const updateUserInFirestore = async (user: CustomUser) => {
    try {
      const userRef = doc(db, "users", user.uid);
      const userDataToUpdate = {
        ...user,
        lastLogin: new Date().toISOString(),
      };

      // Remove photoURL if it's undefined
      if (userDataToUpdate.photoURL === undefined) {
        delete userDataToUpdate.photoURL;
      }

      await setDoc(userRef, userDataToUpdate, { merge: true });
    } catch (error) {
      console.error("Firestore update error:", error);
    }
  };

  const redirectToReturnUrl = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const returnUrl = searchParams.get("returnUrl");
    if (returnUrl && !returnUrl.includes("/auth")) {
      router.replace(returnUrl);
    } else {
      router.replace("/account");
    }
  };

  const logout = async () => {
    try {
      setIsLoggingOut(true);
      await signOut(auth);
      deleteCookie("user");
      setCurrentUser(null);
      router.replace("/");
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
        router.push(`/auth?returnUrl=${encodeURIComponent(returnPath)}`);
      }
    },
    [currentUser, loading, router, pathname]
  );

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signInWithEmailAndPassword: signInWithEmailAndPasswordHandler,
        signUpWithEmailAndPassword: signUpWithEmailAndPasswordHandler,
        logout,
        isLoggingOut,
        isLoggingIn,
        user: currentUser,
        loading,
        initiateAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
