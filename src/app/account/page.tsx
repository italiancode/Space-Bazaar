"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { db } from "@/config/firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { motion } from "framer-motion";
import {
  User,
  ShoppingCart,
  Package,
  CreditCard,
  LogOut,
  Activity,
  Rocket,
  Shield,
  Bell,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

interface Activity {
  id: string;
  action: string;
  timestamp: string;
}

export default function AccountPage() {
  const { user, loading, logout } = useAuth();
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      if (user) {
        const activitiesCollection = collection(db, "activities");
        const activitiesQuery = query(
          activitiesCollection,
          orderBy("timestamp", "desc"),
          limit(5)
        );
        const activitySnapshot = await getDocs(activitiesQuery);
        const activityList = activitySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Activity[];
        setActivities(activityList);
      }
    };

    fetchActivities();
  }, [user]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!user) {
    return (
      <p className="text-center text-lg text-gray-300">
        User not found. Please log in.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        <header className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
            Secure Account Dashboard
          </h1>
          <p className="text-xl text-gray-300">
            Manage your account with confidence
          </p>
        </header>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="flex justify-center space-x-8 mb-8 border-b border-gray-700">
            <TabsTrigger
              value="profile"
              className="px-6 py-2 text-sm font-semibold"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="px-6 py-2 text-sm font-semibold"
            >
              Security
            </TabsTrigger>
            <TabsTrigger
              value="activity"
              className="px-6 py-2 text-sm font-semibold"
            >
              Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileTab user={user} logout={logout} />
          </TabsContent>

          <TabsContent value="security">
            <SecurityTab />
          </TabsContent>

          <TabsContent value="activity">
            <ActivityTab activities={activities} />
          </TabsContent>
        </Tabs>

        <div className="text-center mt-12">
          <Link href="/dashboard">
            <Button
              variant="default"
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white transition-all duration-300"
            >
              <Rocket className="mr-2 h-5 w-5" /> Launch Dashboard
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

function ProfileTab({ user, logout }: { user: any; logout: () => void }) {
  return (
    <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold flex items-center text-blue-300">
          <User className="mr-2 h-5 w-5" /> User Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
          <Avatar className="h-24 w-24 ring-2 ring-blue-500">
            <AvatarImage src={user.photoURL || undefined} alt={user.name} />
            <AvatarFallback className="bg-blue-600 text-2xl">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-semibold text-blue-300">
              {user.name}
            </h2>
            <p className="text-gray-400">{user.email}</p>
            <Badge variant="outline" className="mt-2">
              Verified Account
            </Badge>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <QuickAccessButton
            href="/shop/cart"
            icon={<ShoppingCart className="mr-2 h-4 w-4" />}
            label="My Cart"
          />
          <QuickAccessButton
            href="/orders"
            icon={<Package className="mr-2 h-4 w-4" />}
            label="My Orders"
          />
          <QuickAccessButton
            href="/billing"
            icon={<CreditCard className="mr-2 h-4 w-4" />}
            label="Billing"
          />
          <Button variant="destructive" onClick={logout} className="w-full">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function SecurityTab() {
  return (
    <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold flex items-center text-blue-300">
          <Shield className="mr-2 h-5 w-5" /> Security Center
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Account Security Score</h3>
            <Progress value={80} className="w-full" />
            <p className="text-sm text-gray-400 mt-1">
              Consider enabling 2FA for maximum security.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Recent Login</h3>
            <p className="text-sm text-gray-400">
              Last login: {new Date().toLocaleString()}
            </p>
          </div>
          <Button variant="outline" className="w-full">
            <Shield className="mr-2 h-4 w-4" /> Enable Two-Factor Authentication
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ActivityTab({ activities }: { activities: Activity[] }) {
  return (
    <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold flex items-center text-blue-300">
          <Activity className="mr-2 h-5 w-5" /> Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activities.length === 0 ? (
            <li className="text-center text-gray-400">
              No recent activities found.
            </li>
          ) : (
            activities.map((activity) => (
              <motion.li
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-700/50 rounded-lg p-3 border border-gray-600 flex items-center"
              >
                <Bell className="mr-3 h-4 w-4 text-blue-400" />
                <div>
                  <p className="text-blue-300">{activity.action}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(activity.timestamp).toLocaleString()}
                  </p>
                </div>
              </motion.li>
            ))
          )}
        </ul>
      </CardContent>
    </Card>
  );
}

function QuickAccessButton({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link href={href}>
      <Button
        variant="outline"
        size="lg"
        className="w-full flex justify-center items-center space-x-2"
      >
        {" "}
        {icon} <span>{label}</span>{" "}
      </Button>{" "}
    </Link>
  );
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900">
      {" "}
      <div className="space-y-4 w-72">
        {" "}
        <Skeleton className="h-12 w-full" />{" "}
        <Skeleton className="h-8 w-3/4 mx-auto" />{" "}
        <Skeleton className="h-8 w-1/2 mx-auto" />{" "}
        <Skeleton className="h-56 w-full rounded-lg" />{" "}
      </div>{" "}
    </div>
  );
}
