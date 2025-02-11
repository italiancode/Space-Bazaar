"use client";


import { motion } from "framer-motion";
import Link from "next/link";
import { Bell, Rocket, LogOut, ShoppingBag } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

const getFirstName = (name: string) => {
  return name.split(" ")[0];
};

const notifications = [
  {
    id: 1,
    title: "New Order Received",
    message: "Order #1234 has been placed.",
  },
  {
    id: 2,
    title: "Payment Received",
    message: "Payment for order #1234 has been received.",
  },
  {
    id: 3,
    title: "New User Registered",
    message: "A new user has registered on your platform.",
  },
];

export default function Header() {
  const { currentUser, logout } = useAuth();
  // const [activeNotification, setActiveNotification] = useState(0);

  return (
    <div className="bg-space-dark border-b border-space-accent/30 py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2 bg-space-accent/20 backdrop-blur-sm rounded-full py-2 px-4"
          >
            <Rocket className="w-5 h-5 text-space-highlight" />
            <span className="text-space-light font-semibold">
              Welcome,{" "}
              {currentUser?.name ? getFirstName(currentUser.name) : "Astronaut"}
              !
            </span>
          </motion.div>
          <Link href="/shop" passHref>
            <Button
              variant="ghost"
              className="bg-space-accent/20 hover:bg-space-accent/30 text-space-light"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Shop
            </Button>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Bell className="w-6 h-6 text-space-light" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              {notifications.map((notification) => (
                <DropdownMenuItem key={notification.id}>
                  {notification.title} - {notification.message}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src={currentUser?.photoURL || ""}
                  alt={currentUser?.name || "User avatar"}
                />
                <AvatarFallback>
                  {currentUser?.name
                    ? getFirstName(currentUser.name).charAt(0).toUpperCase()
                    : "U"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Profile</DropdownMenuLabel>
              <DropdownMenuItem>
                <Link href="/profile" passHref>
                  Profile Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
