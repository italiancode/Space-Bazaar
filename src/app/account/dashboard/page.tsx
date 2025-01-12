"use client";

import { useAuth } from "@/contexts/AuthContext";

export default function Dashboard() {
  
  const { loading, currentUser } = useAuth(); // Destructure as an object

  if (loading) {
    return <p className="text-center text-lg">Loading...</p>;
  }


  return (
    <div className="py-24 px-4 bg-background text-foreground">
      <h1 className="text-4xl font-bold text-center mb-12">User Dashboard</h1>
     
        <ul className="space-y-4">
          
            <li key={currentUser?.id} className="flex justify-between items-center bg-space-gray text-foreground rounded-lg shadow-md p-4 hover:bg-accent-blue transition-colors">
              <span>{currentUser?.name}</span>
              <span>{currentUser?.email}</span>
              <span>{currentUser?.role}</span> {/* Display user role */}
              {/* Add more user details as needed */}
            </li>
          
        </ul>
      
    </div>
  );
} 