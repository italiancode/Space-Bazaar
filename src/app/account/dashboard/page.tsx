"use client";

import { useAuth } from "@/contexts/AuthContext";

export default function Dashboard() {
  
  const { loading, currentUser } = useAuth(); // Destructure as an object

  if (loading) {
    return <p className="text-center text-lg">Loading...</p>;
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-black text-white">
      <header className="py-6 text-center">
        <h1 className="text-4xl font-bold">User Dashboard</h1>
      </header>
      <main className="max-w-7xl mx-auto px-4">
        <ul className="space-y-4">
          <li key={currentUser?.id} className="flex justify-between items-center bg-space-gray text-foreground rounded-lg shadow-md p-4 hover:bg-accent-blue transition-colors">
            <span>{currentUser?.name}</span>
            <span>{currentUser?.email}</span>
            <span>{currentUser?.role}</span> {/* Display user role */}
            {/* Add more user details as needed */}
          </li>
        </ul>
      </main>
    </div>
  );
} 