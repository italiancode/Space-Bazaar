import React, { createContext, useContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";

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
  isLoggingOut: boolean;
  isLoggingIn: boolean;
  user: CustomUser | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<CustomUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // Map FirebaseUser to your custom User interface
        const user: CustomUser = {
          uid: firebaseUser.uid,
          id: firebaseUser.uid,
          name: firebaseUser.displayName || "",
          email: firebaseUser.email || "",
          role: "user",
          photoURL: firebaseUser.photoURL || undefined,
        };
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

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
      console.log("User document updated in Firestore."); // Log success
    } catch (error) {
      console.error("Error updating user in Firestore:", error); // Log any errors
    }
  };

  const signInWithGoogle = async (): Promise<void> => {
    setIsLoggingIn(true);
    setAuthError(null);
    try {
      const provider = new GoogleAuthProvider();
      const userCred = await signInWithPopup(auth, provider);

      if (userCred) {
        // Map Firebase User to your custom User interface
        const user: CustomUser = {
          uid: userCred.user.uid,
          id: userCred.user.uid, // Assuming you want to use uid as id
          name: userCred.user.displayName || "", // Use displayName from Firebase User
          email: userCred.user.email || "", // Use email from Firebase User
          role: "user", // Set a default role or fetch it from your database
          photoURL: userCred.user.photoURL || undefined, // Use photoURL from Firebase User
        };

        // Use the mapped user object to update user information in Firestore
        await updateUserInFirestore(user);
        console.log("User added to Firestore:", user); // Log success
      } else {
        console.error("No user credential returned."); // Log if no user
      }
    } catch (error) {
      console.error("Auth error:", error); // Log the error
      setAuthError("Sign in was unavailable. Please try again later.");
      throw error; // Rethrow the error if needed
    } finally {
      setIsLoggingIn(false);
      setAuthError(null);
    }
  };

  const logout = async () => {
    setIsLoggingOut(true);
    try {
      localStorage.setItem("logout_in_progress", "true");

      await signOut(auth);

      localStorage.removeItem("logout_in_progress");

      window.location.reload();
    } catch (error) {
      console.error("Logout error:", error);
      localStorage.removeItem("logout_in_progress");
      throw error;
    } finally {
      setIsLoggingOut(false);
    }
  };

  useEffect(() => {
    const checkIncompleteLogout = async () => {
      if (localStorage.getItem("logout_in_progress")) {
        localStorage.removeItem("logout_in_progress");
        if (auth.currentUser) {
          await signOut(auth);
        }
      }
    };

    checkIncompleteLogout();
  }, []);

  const value = {
    currentUser,
    signInWithGoogle,
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
