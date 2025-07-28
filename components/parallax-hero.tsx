"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface ParallaxHeroProps {
  imageUrl: string
  title: string
  subtitle: string
}

export function ParallaxHero({ imageUrl, title, subtitle }: ParallaxHeroProps) {
  const [offsetY, setOffsetY] = useState(0)
  const handleScroll = () => setOffsetY(window.scrollY)

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="relative h-[60vh] overflow-hidden flex items-center justify-center text-center">
      <Image
        src={imageUrl || "/placeholder.svg"}
        alt="Hero Background"
        fill
        style={{ objectFit: "cover", transform: `translateY(${offsetY * 0.5}px)` }}
        className="transition-transform duration-100 ease-out"
        priority
      />
      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-4 z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-4">{title}</h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl">{subtitle}</p>
      </div>
    </div>
  )
}
