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
    if (!loading && !currentUser) {
      initiateAuth(window.location.pathname); // Redirect to auth page if not authenticated
    }
  }, [currentUser, loading, initiateAuth]);

  if (loading) {
    return <LoadingSkeleton />; // Display loading skeleton while checking auth status
  }

  if (!loading && currentUser) {
    return <>{children}</>; // Render protected content
  }

  return <LoadingSkeleton />; // Display loading skeleton during redirect
}
