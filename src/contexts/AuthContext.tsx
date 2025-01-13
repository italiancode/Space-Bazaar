import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<CustomUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();

  // Handle auth state changes
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const transformedUser: CustomUser = {
          uid: user.uid,
          id: user.uid,
          name: user.displayName || 'Anonymous',
          email: user.email || '',
          role: 'user',
          photoURL: user.photoURL || undefined,
        };
        setCurrentUser(transformedUser);
        // Update cookie when auth state changes
        setCookie('user', JSON.stringify(transformedUser));
      } else {
        setCurrentUser(null);
        deleteCookie('user');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async (): Promise<void> => {
    if (isLoggingIn) return;
    
    try {
      setIsLoggingIn(true);
      const provider = new GoogleAuthProvider();
      
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
        setCookie('user', JSON.stringify(user));
        
        // Handle redirect
        const searchParams = new URLSearchParams(window.location.search);
        const returnUrl = searchParams.get('returnUrl');
        router.push(returnUrl && !returnUrl.includes('/auth') ? returnUrl : '/account');
        
      } catch (popupError) {
        console.error("Popup error:", popupError);
        // If popup fails, try redirect (especially for mobile)
        await signInWithRedirect(auth, provider);
      }
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle redirect result
  useEffect(() => {
    if (!loading && !currentUser) {
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
            setCurrentUser(user);
            setCookie('user', JSON.stringify(user));
            
            const searchParams = new URLSearchParams(window.location.search);
            const returnUrl = searchParams.get('returnUrl');
            router.push(returnUrl && !returnUrl.includes('/auth') ? returnUrl : '/account');
          }
        } catch (error) {
          console.error("Redirect result error:", error);
        }
      };

      handleRedirectResult();
    }
  }, [loading, currentUser, router]);

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

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
      deleteCookie('user');
      router.push('/');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const initiateAuth = useCallback((returnPath?: string) => {
    if (!loading && !currentUser) {
      const currentPath = returnPath || window.location.pathname;
      // Only include paths that actually exist
      const publicPaths = ['/'];
      
      if (!currentPath.includes('/auth') && !publicPaths.includes(currentPath)) {
        router.push(`/auth?returnUrl=${encodeURIComponent(currentPath)}`);
      }
    }
  }, [currentUser, loading, router]);

  const value = {
    currentUser,
    signInWithGoogle,
    initiateAuth,
    logout,
    isLoggingOut: false,
    isLoggingIn,
    user: currentUser,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
