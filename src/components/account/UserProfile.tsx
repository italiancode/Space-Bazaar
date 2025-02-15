import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Shield } from 'lucide-react';
import { User } from "@/components/types/customer_user";
import { Button } from "../ui/button";
import { useAuth } from "@/contexts/AuthContext";

interface UserProfileProps {
  user: User;
}

export default function UserProfile({ user }: UserProfileProps) {
  const { logout } = useAuth();

  return (
    <Card className="bg-space-gray rounded-xl shadow-lg border border-indigo-600">
      <CardContent className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
          <Avatar className="w-20 h-20 ring-2 ring-yellow-400">
            <AvatarImage src={user?.photoURL} />
            <AvatarFallback className="bg-indigo-700">
              {user?.name?.charAt(0) || "A"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-grow space-y-2 text-center sm:text-left">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-[var(--accent-blue)] bg-clip-text text-transparent">
              {user?.name}
            </h2>
            <p className="text-gray-400">{user?.email}</p>
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <Shield className="w-4 h-4 text-blue-500" />
              <span className="text-blue-500 text-sm">Verified</span>
            </div>
          </div>
          <Button
            variant="outline"
            className="text-white hover:bg-red-500 hover:text-white transition-colors duration-300"
            onClick={logout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-indigo-700 p-4 rounded-lg">
            <p className="text-indigo-200">Reputation</p>
            <p className="text-2xl font-bold flex items-center">
              4.9 <Star className="w-5 h-5 ml-1 text-yellow-400" />
            </p>
          </div>
          <div className="bg-indigo-700 p-4 rounded-lg">
            <p className="text-indigo-200">Trades</p>
            <p className="text-2xl font-bold">42</p>
          </div>
        </div> */}
      </CardContent>
    </Card>
  );
}

