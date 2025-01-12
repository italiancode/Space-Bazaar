"use client";

import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingSkeleton } from '../ui/loading-skeleton';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, loading, initiateAuth } = useAuth();

  useEffect(() => {
    if (!loading && !currentUser) {
      // Initiate auth with current path as destination
      initiateAuth(window.location.pathname); // Redirect to auth page if not authenticated
    }
  }, [currentUser, loading, initiateAuth]);

  // Show loading state while checking authentication
  if (loading) {
    return <LoadingSkeleton />; // Display loading skeleton while checking auth status
  }

  // If not loading and we have a user, show the protected content
  if (!loading && currentUser) {
    return <>{children}</>; // Render protected content
  }

  // If not loading and no user, show loading while redirect happens
  return <LoadingSkeleton />; // Display loading skeleton during redirect
} 