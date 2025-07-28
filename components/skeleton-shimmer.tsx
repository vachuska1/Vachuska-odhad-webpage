"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SkeletonShimmerProps {
  isLoading: boolean
  children: React.ReactNode
}

// Skeleton component with shimmer effect
const Skeleton = () => (
  <div className="relative overflow-hidden bg-gray-200 dark:bg-gray-700 rounded-md h-full w-full">
    <div className="shimmer-animation absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
  </div>
)

export function SkeletonShimmer({ isLoading, children }: SkeletonShimmerProps) {
  return (
    <Card className="p-4 bg-card text-card-foreground shadow-lg max-w-2xl mx-auto">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-center">Dynamické načítání s efektem třpytu</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton />
            <div className="h-4 w-3/4">
              <Skeleton />
            </div>
            <div className="h-4 w-1/2">
              <Skeleton />
            </div>
            <div className="h-24">
              <Skeleton />
            </div>
          </div>
        ) : (
          children
        )}
      </CardContent>
    </Card>
  )
}

// Example usage component
export function DynamicContentExample() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000) // Simulate 3 seconds of loading
    return () => clearTimeout(timer)
  }, [])

  return (
    <SkeletonShimmer isLoading={loading}>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Načtený obsah</h3>
        <p className="text-muted-foreground">
          Toto je dynamicky načtený obsah, který se objeví po dokončení simulovaného načítání.
        </p>
        <p className="text-muted-foreground">
          Můžete si představit, že zde jsou data z API, obrázky nebo složité UI prvky.
        </p>
        <div className="h-24 bg-blue-100 dark:bg-blue-900 rounded-md flex items-center justify-center text-blue-800 dark:text-blue-200">
          Skutečný obsah
        </div>
      </div>
    </SkeletonShimmer>
  )
}
