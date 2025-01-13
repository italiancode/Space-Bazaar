import { Card, CardContent } from "@/components/ui/card"
import { Moon, Star, Sun } from 'lucide-react'

export default function RecentActivity() {
  return (
    <Card className="bg-indigo-800 rounded-xl shadow-lg border border-indigo-600">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-yellow-400">Recent Activity</h2>
        <ul className="space-y-4">
          <li className="flex items-center justify-between p-3 bg-indigo-700 rounded-lg">
            <span className="flex items-center">
              <Moon className="w-5 h-5 mr-2 text-blue-300" />
              Mars Colony Expansion
            </span>
            <span className="text-blue-300 font-semibold">In Progress</span>
          </li>
          <li className="flex items-center justify-between p-3 bg-indigo-700 rounded-lg">
            <span className="flex items-center">
              <Star className="w-5 h-5 mr-2 text-yellow-400" />
              Starlink Satellite Launch
            </span>
            <span className="text-green-400 font-semibold">Completed</span>
          </li>
          <li className="flex items-center justify-between p-3 bg-indigo-700 rounded-lg">
            <span className="flex items-center">
              <Sun className="w-5 h-5 mr-2 text-orange-400" />
              Hyperloop Test Run
            </span>
            <span className="text-orange-400 font-semibold">Scheduled</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}

