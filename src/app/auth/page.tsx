"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

const AuthPage = () => {
  const { signInWithEmailAndPassword, signUpWithEmailAndPassword, isLoggingIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between sign-in and sign-up

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      await signUpWithEmailAndPassword(email, password, name);
    } else {
      await signInWithEmailAndPassword(email, password);
    }
  };

  return (
    <div className="h-[80vh] flex items-center justify-center">
      <div className="bg-space-gray p-8 rounded-xl shadow-lg max-w-md w-full mx-4 border border-text-secondary/10">
        <h1 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-white to-[var(--accent-blue)] bg-clip-text text-transparent">
          Welcome to Space Bazaar
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text-secondary">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 mt-1 bg-space-gray border border-text-secondary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)]"
                placeholder="Enter your name"
                required
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-secondary">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 bg-space-gray border border-text-secondary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)]"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text-secondary">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 bg-space-gray border border-text-secondary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)]"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full bg-[var(--accent-blue)] text-white px-4 py-2 rounded-lg hover:bg-[var(--accent-blue-dark)] disabled:opacity-50 transition-colors"
          >
            {isLoggingIn
              ? "Processing..."
              : isSignUp
              ? "Sign Up"
              : "Sign In"}
          </button>
        </form>

        <p className="mt-4 text-text-secondary text-sm text-center">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-[var(--accent-blue)] hover:underline focus:outline-none"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>

        <p className="mt-4 text-text-secondary text-sm text-center">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default AuthPage;