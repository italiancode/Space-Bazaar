"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  signInWithRedirect,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  getRedirectResult,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { setCookie, deleteCookie } from "cookies-next";

interface CustomUser {
  uid: string;
  id: string;
  name: string;
  email: string;
  role: string; // Add a role field to differentiate users
  photoURL?: string; // Optional property for user's profile picture URL
}

interface AuthContextType {
  currentUser: CustomUser | null;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  isLoggingIn: boolean;
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
  const [currentUser, setCurrentUser] = useState<CustomUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const user: CustomUser = {
          uid: firebaseUser.uid,
          id: firebaseUser.uid,
          name: firebaseUser.displayName || "",
          email: firebaseUser.email || "",
          role: "user",
          photoURL: firebaseUser.photoURL || undefined,
        };
        setCurrentUser(user);
        const token = await firebaseUser.getIdToken();
        setCookie("auth-token", token);
      } else {
        setCurrentUser(null);
        deleteCookie("auth-token");
      }
      setLoading(false);
    });

    // Handle the redirect result
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          const firebaseUser = result.user;
          console.log("User signed in:", firebaseUser); // Log the user object
          const user: CustomUser = {
            uid: firebaseUser.uid,
            id: firebaseUser.uid,
            name: firebaseUser.displayName || "",
            email: firebaseUser.email || "",
            role: "user", // Set a default role or adjust as needed
            photoURL: firebaseUser.photoURL || undefined,
          };
          setCurrentUser(user);
        } else {
          console.log("No user found after redirect."); // Log if no user is found
        }
      } catch (error) {
        console.error("Error handling redirect result:", error); // Log any errors
      }
    };

    handleRedirectResult();

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async (): Promise<void> => {
    setIsLoggingIn(true);
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
    setIsLoggingIn(false);
  };

  const logout = async () => {
    await signOut(auth);
    setCurrentUser(null);
    deleteCookie("auth-token");
  };

  const value = {
    currentUser,
    signInWithGoogle,
    logout,
    loading,
    isLoggingIn,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
