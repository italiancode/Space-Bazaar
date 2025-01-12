"use client";

import { useEffect, useState } from "react";
import { db } from "@/config/firebase"; // Import your Firebase config
import { collection, getDocs } from "firebase/firestore";

interface User {
  id: string;
  name: string;
  email: string;
  role: string; // Add a role field to differentiate users
}

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, "users"); // Adjust the collection name as needed
        const userSnapshot = await getDocs(usersCollection);
        const userList = userSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data() as Omit<User, 'id'> // Spread the rest of the user data
        }));
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  return (
    <div className="py-24 px-4 bg-background text-foreground">
      <h1 className="text-4xl font-bold text-center mb-12">User Dashboard</h1>
      {users.length === 0 ? (
        <p className="text-center text-lg">No users found.</p>
      ) : (
        <ul className="space-y-4">
          {users.map(user => (
            <li key={user.id} className="flex justify-between items-center bg-space-gray text-foreground rounded-lg shadow-md p-4 hover:bg-accent-blue transition-colors">
              <span>{user.name}</span>
              <span>{user.email}</span>
              <span>{user.role}</span> {/* Display user role */}
              {/* Add more user details as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 