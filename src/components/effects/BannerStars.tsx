"use client"

import type React from "react"
import { useEffect, useRef } from "react"

export const BannerStars: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const stars: { x: number; y: number; radius: number; alpha: number }[] = []

    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        alpha: Math.random() * 0.5,
      })
    }

    const blinkStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "white"

      stars.forEach((star) => {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.globalAlpha = star.alpha
        ctx.fill()

        star.alpha += 0.005
        if (star.alpha > 0.5) {
          star.alpha = Math.random() * 0.2
        }
      })

      requestAnimationFrame(blinkStars)
    }

    blinkStars()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0" />
}

