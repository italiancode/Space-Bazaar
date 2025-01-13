"use client";

import { motion } from "framer-motion";

import UserProfile from "@/components/account/UserProfile";

import RecentActivity from "@/components/account/RecentActivity";

import TraderDashboard from "@/components/account/TraderDashboard";
import { useAuth } from "@/contexts/AuthContext";

import { User } from "@/components/types/customer_user";
import Header from "@/components/account/Header";
import ProtectedRoute from "@/components/route/ProtectedRoute";

export default function AccountPage() {
  const { currentUser } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-black text-white">
        <Header />
        <main className="max-w-7xl mx-auto py-12 px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <RecentActivity />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className=""
            >
              <TraderDashboard />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <div className="lg:col-span-1">
              {currentUser && <UserProfile user={currentUser} />}
            </div>
          </motion.div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
