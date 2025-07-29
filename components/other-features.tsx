"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useState, useEffect, useRef } from "react"
import { Sun, Moon } from "lucide-react"

interface OtherFeaturesProps {
  darkModeToggle: string;
  darkMode: string;
  liveSearch: string;
  searchPlaceholder: string;
  dragToReorder: string;
  dragToReorderDesc: string;
  scrollIndicator: {
    title: string;
    items: string[];
  };
  hoverEffect: {
    title: string;
    hover: string;
    cardTitle: string;
    cardDesc: string;
  };
  lang?: 'cs' | 'en';
}

export function OtherFeatures({ 
  darkModeToggle, 
  darkMode, 
  liveSearch, 
  searchPlaceholder, 
  dragToReorder,
  dragToReorderDesc,
  scrollIndicator,
  hoverEffect,
  lang = 'cs'
}: OtherFeaturesProps) {
  const { theme, setTheme } = useTheme()
  const [searchTerm, setSearchTerm] = useState("")
  const [items, setItems] = useState(["Weby", "Animace", "Formuláře", "Ostatní", "Menu"])
  const [filteredItems, setFilteredItems] = useState(items)

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Live Search
  useEffect(() => {
    setFilteredItems(items.filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase())))
  }, [searchTerm, items])

  // Scroll Indicator
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current
        const progress = (scrollTop / (scrollHeight - clientHeight)) * 100
        setScrollProgress(progress)
      }
    }

    const currentRef = scrollContainerRef.current
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll)
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  // Drag & Drop
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const handleDragStart = (e: React.DragEvent, item: string) => {
    setDraggedItem(item)
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/plain", item)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent, targetItem: string) => {
    e.preventDefault()
    if (draggedItem === null || draggedItem === targetItem) return

    const newItems = [...items]
    const draggedIndex = newItems.indexOf(draggedItem)
    const targetIndex = newItems.indexOf(targetItem)

    if (draggedIndex > -1 && targetIndex > -1) {
      const [removed] = newItems.splice(draggedIndex, 1)
      newItems.splice(targetIndex, 0, removed)
      setItems(newItems)
      setFilteredItems(newItems.filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase())))
    }
    setDraggedItem(null)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {/* Dark Mode Toggle */}
      <Card className="p-4 bg-card text-card-foreground shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold">{dragToReorder}</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-24">
          <Button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            variant="outline"
            size="lg"
            className="bg-transparent text-foreground border-border hover:bg-accent"
          >
            {theme === "dark" ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            <span className="ml-2 text-lg">
              {theme === "dark" 
                ? lang === 'cs' ? 'Světlý režim' : 'Light mode'
                : lang === 'cs' ? 'Tmavý režim' : 'Dark mode'}
            </span>
          </Button>
        </CardContent>
      </Card>

      {/* Live Search Input */}
      <Card className="p-4 bg-card text-card-foreground shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold">{liveSearch}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-3 text-base"
          />
          <ul className="max-h-32 overflow-y-auto border rounded-md p-2 text-base">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <li key={index} className="py-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-sm">
                  {item}
                </li>
              ))
            ) : (
              <li className="py-1 px-2 text-gray-500">Nenalezeny žádné položky.</li>
            )}
          </ul>
        </CardContent>
      </Card>

      {/* Drag & Drop */}
      <Card className="p-4 bg-card text-card-foreground shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold">{dragToReorder}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="max-h-32 overflow-y-auto border rounded-md p-2 text-base">
            {items.map((item, index) => (
              <div
                key={item}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, item)}
                className={`p-2 mb-1 bg-gray-100 dark:bg-gray-800 rounded-md cursor-grab hover:bg-gray-200 dark:hover:bg-gray-700
                            ${draggedItem === item ? "opacity-50 border-2 border-blue-500" : ""}`}
              >
                {item}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500">{dragToReorderDesc}</p>
        </CardContent>
      </Card>

      {/* Animated Scroll Indicator (requires parent to be scrollable) */}
      <Card className="lg:col-span-3 p-4 bg-card text-card-foreground shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold">{scrollIndicator.title}</CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full mb-4">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-100"
              style={{ width: `${scrollProgress}%` }}
            ></div>
          </div>
          <div ref={scrollContainerRef} className="h-48 overflow-y-auto border rounded-md p-4 scroll-snap-y-mandatory">
            {scrollIndicator.items.map((item, i) => (
              <div
                key={i}
                className="h-24 flex items-center justify-center text-lg border-b last:border-b-0 scroll-snap-align-start"
              >
                {item}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Custom Hover Effect Example */}
      <Card className="lg:col-span-3 p-4 bg-card text-card-foreground shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold">{hoverEffect.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4 justify-center">
          <Button className="group relative overflow-hidden transition-all duration-300 hover:scale-105 py-3 px-6 text-lg">
            <span className="relative z-10">{hoverEffect.hover}</span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Button>
          <div className="relative p-6 border rounded-lg cursor-pointer group overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <h3 className="font-semibold relative z-10 text-xl">{hoverEffect.cardTitle}</h3>
            <p className="text-base text-gray-600 dark:text-gray-400 relative z-10">{hoverEffect.cardDesc}</p>
            <div className="absolute inset-0 bg-blue-500 scale-0 group-hover:scale-100 transition-transform duration-300 origin-bottom-right"></div>
            <div className="absolute inset-0 bg-purple-500 scale-0 group-hover:scale-100 transition-transform duration-300 origin-top-left delay-100"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
