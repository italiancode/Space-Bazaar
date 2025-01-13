"use client";

import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { LoadingSkeleton } from "../ui/loading-skeleton";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser, loading, initiateAuth } = useAuth();

  useEffect(() => {
    // Only redirect if we're sure there's no user and loading is complete
    if (!loading && !currentUser) {
      initiateAuth();
    }
  }, [currentUser, loading, initiateAuth]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  // Show protected content only if user is authenticated
  if (!loading && currentUser) {
    return <>{children}</>;
  }

  // Show loading while redirecting
  return <LoadingSkeleton />;
}
