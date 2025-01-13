"use client";

// import { Rocket, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const getFirstName = (fullName: string): string => {
  const names = fullName.trim().split(" ");
  return names[0];
};

export default function Header() {
  const { currentUser } = useAuth();

  return (
    <header className="relative bg-gradient-to-r from-[#1c3a70]/150 to-[#0a1128] py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-end items-center">
        <div className="flex items-center space-x-2 z-10">
          {/* <Rocket className="w-8 h-8 text-yellow-400" /> */}
          <h1 className="text-xl font-bold text-gradient-to-r from-white to-[var(--accent-blue)] bg-clip-text text-transparent">
            Hi, {currentUser?.name ? getFirstName(currentUser.name) : "Guest"}
          </h1>
        </div>
      </div>

      {/* Bottom fade & glow effect - blending with content below */}
      <div className="absolute inset-x-0 top-0 h-full z-0">
        <div className="absolute inset-x-0 top-0 h-auto bg-gradient-to-b from-[#4F46E5] to-transparent" />
      </div>

      {/* Top fade & glow effect - blending with hero */}
      <div className="absolute inset-x-0 bottom-0 h-10 z-0">
        <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[#1c3970] via-background/10 to-transparent" />
        <div className="bg-gradient-to-b from-[#4e46e56d] to-transparent" />
      </div>
    </header>
  );
}
