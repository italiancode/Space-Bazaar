"use client";

import { useAuth } from "@/contexts/AuthContext";
import { FcGoogle } from "react-icons/fc";

const AuthPage = () => {
  const { signInWithGoogle, isLoggingIn } = useAuth();

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-space-gray p-8 rounded-xl shadow-lg max-w-md w-full mx-4 border border-text-secondary/10">
        <h1 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-white to-[var(--accent-blue)] bg-clip-text text-transparent">
          Welcome to Space Bazaar
        </h1>

        <div className="space-y-4">
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoggingIn}
            className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-colors"
          >
            <FcGoogle className="w-5 h-5" />
            Continue with Google
          </button>
        </div>

        <p className="mt-4 text-text-secondary text-sm text-center">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
