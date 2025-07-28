"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

interface LanguageToggleProps {
  onLanguageChange: (lang: "cz" | "en") => void
}

export function LanguageToggle({ onLanguageChange }: LanguageToggleProps) {
  const [language, setLanguage] = useState<"cz" | "en">("cz")

  useEffect(() => {
    onLanguageChange(language)
  }, [language, onLanguageChange])

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "cz" ? "en" : "cz"))
  }

  return (
    <Button onClick={toggleLanguage} variant="outline" className="ml-auto bg-transparent">
      {language === "cz" ? "English" : "Česky"}
    </Button>
  )
}
