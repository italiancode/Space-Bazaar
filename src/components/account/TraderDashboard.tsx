'use client'

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap } from 'lucide-react'

export default function TraderDashboard() {
  const [portfolioValue, setPortfolioValue] = useState(128450)
  const [successRate, setSuccessRate] = useState(92)

  const handleQuickTrade = () => {
    // Simulate a quick trade
    const tradeResult = Math.random() > 0.3
    if (tradeResult) {
      setPortfolioValue(prev => Math.round(prev * 1.05))
      setSuccessRate(prev => Math.min(100, prev + 1))
    } else {
      setPortfolioValue(prev => Math.round(prev * 0.98))
      setSuccessRate(prev => Math.max(0, prev - 1))
    }
  }

  return (
    <Card className="bg-indigo-800 rounded-xl shadow-lg border border-indigo-600">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-yellow-400">{"Trader's Dashboard"}</h2>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span>Portfolio Value</span>
              <span className="font-semibold text-green-400">${portfolioValue.toLocaleString()}</span>
            </div>
            <div className="w-full bg-indigo-950 rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(portfolioValue / 200000) * 100}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span>Trade Success Rate</span>
              <span className="font-semibold">{successRate}%</span>
            </div>
            <div className="w-full bg-indigo-950 rounded-full h-2.5">
              <div
                className="bg-blue-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${successRate}%` }}
              ></div>
            </div>
          </div>
          <Button
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-indigo-900 font-bold transition-colors duration-300"
            onClick={handleQuickTrade}
          >
            <Zap className="mr-2 h-5 w-5" /> Quick Trade
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

