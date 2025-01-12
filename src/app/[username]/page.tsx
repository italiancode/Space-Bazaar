"use client";

import { useEffect, useState } from "react";
import { db } from "@/config/firebase"; // Import your Firebase config
import { doc, getDoc } from "firebase/firestore";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  // Add other fields as necessary
}

export default function UserProfilePage({ params }: { params: { username: string } }) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userDoc = doc(db, "sellers", params.username); // Assuming usernames are stored as document IDs
        const userSnapshot = await getDoc(userDoc);
        
        if (userSnapshot.exists()) {
          setUserProfile({ id: userSnapshot.id, ...userSnapshot.data() } as UserProfile);
        } else {
          console.error("No such user!");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [params.username]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!userProfile) {
    return <p>User not found.</p>;
  }

  return (
    <div className="py-24 px-4">
      <h1 className="text-4xl font-bold text-center mb-12">{userProfile.name}</h1>
      <p className="text-center">{userProfile.email}</p>
      {/* Add more user details as needed */}
    </div>
  );
} 