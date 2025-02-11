"use client";

import { motion } from "framer-motion";

import UserProfile from "@/components/account/UserProfile";

import { useAuth } from "@/contexts/AuthContext";

import ProtectedRoute from "@/components/route/ProtectedRoute";

export default function AccountPage() {
  const { currentUser } = useAuth();

  return (
    <ProtectedRoute>
     
        <div className="lg:col-span-1">
          {currentUser && <UserProfile user={currentUser} />}
        </div>
     

      {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
        </div> */}
    </ProtectedRoute>
  );
}
