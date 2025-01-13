"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Rocket, Bell, Info } from "lucide-react";

type NotificationProps = {
  show: boolean;
  message: string;
  type?: "info" | "success" | "warning";
  icon?: string;
};

const getFirstName = (fullName: string): string => {
  const names = fullName.trim().split(" ");
  return names[0];
};

// You can control this from wherever you need
const notification: NotificationProps = {
  show: true, // Set to false to hide the notification section
  message:
    "🎉 New features available! Check out our latest updates in the notifications panel.",
  type: "info",
  icon: "🎉",
};

export default function Header() {
  const { currentUser } = useAuth();

  return (
    <div className="bg-slate-900/50 border-y border-slate-800">
      <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-6">
          <div className="flex w-full sm:w-auto items-center gap-1.5 sm:gap-2 md:gap-3">
            <div
              className="flex items-center space-x-1.5 sm:space-x-2 backdrop-blur-sm bg-white/10 
              rounded-full py-1 sm:py-1.5 md:py-2 px-2 sm:px-3 md:px-4 shadow-lg hover:bg-white/20 
              transition-all duration-300"
            >
              <h1
                className="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-yellow-200 
                to-yellow-500 bg-clip-text text-transparent whitespace-nowrap"
              >
                Hi,{" "}
                {currentUser?.name ? getFirstName(currentUser.name) : "Guest"}
              </h1>
              <Rocket className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-yellow-400 animate-[bounce_3s_ease-in-out_infinite]" />
            </div>

            {/* Welcome message with icon */}
            <div className="flex items-center space-x-1.5 sm:space-x-2 text-yellow-400/90 whitespace-nowrap">
              <Info className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm font-medium">
                Welcome to your dashboard!
              </span>
            </div>
          </div>

          {/* Notification container - always present */}
          <div
            className={`flex-1 w-full sm:w-auto px-4 py-1.5 rounded-lg ${
              notification.show ? "bg-slate-800/50" : ""
            }`}
          >
            <p className="text-sm text-slate-300 truncate">
              {notification.show ? notification.message : " "}{" "}
              {/* Empty space to maintain height */}
            </p>
          </div>

          {/* Bell icon - always visible */}
          <button className="relative p-2 rounded-full hover:bg-slate-800/70 transition-colors ml-auto sm:ml-0">
            <Bell className="w-5 h-5 text-slate-400" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full" />
          </button>
        </div>
      </div>
    </div>
  );
}
