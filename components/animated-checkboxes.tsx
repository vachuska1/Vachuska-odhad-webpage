"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch" // For toggle button
import { CheckCircle, XCircle } from "lucide-react" // For icon-based checkbox

export function AnimatedCheckboxes() {
  const [checkedStates, setCheckedStates] = useState(Array(8).fill(false)) // Increased for new types

  const handleCheck = (index: number) => {
    setCheckedStates((prev) => {
      const newStates = [...prev]
      newStates[index] = !newStates[index]
      return newStates
    })
  }

  const checkboxTypes = [
    {
      name: "Standardní (Červená)",
      description: "Výchozí zaškrtávací políčko s červenou barvou.",
      type: "checkbox",
      className: "data-[state=checked]:bg-red-500 data-[state=checked]:text-white transition-colors duration-200",
    },
    {
      name: "Zvětšující se (3x, Fialová)",
      description: "Zvětší se 3x a změní barvu na fialovou při zaškrtnutí.",
      type: "checkbox",
      className:
        "data-[state=checked]:scale-[3] data-[state=checked]:bg-purple-500 data-[state=checked]:text-white transition-all duration-200",
    },
    {
      name: "Pulzující (Žlutá)",
      description: "Krátce pulzuje a změní barvu na žlutou při zaškrtnutí.",
      type: "checkbox",
      className: "data-[state=checked]:bg-yellow-500 data-[state=checked]:text-white transition-colors duration-200",
      checkClassName: "data-[state=checked]:animate-pulse-once", // Custom animation
    },
    {
      name: "Otočné (Zelená)",
      description: "Otočí se a změní barvu na zelenou při zaškrtnutí.",
      type: "checkbox",
      className:
        "data-[state=checked]:rotate-12 data-[state=checked]:bg-green-500 data-[state=checked]:text-white transition-all duration-200",
    },
    {
      name: "Zaoblené (Modrá)",
      description: "Zaoblené zaškrtávací políčko s modrou barvou.",
      type: "checkbox",
      className:
        "rounded-full data-[state=checked]:bg-blue-500 data-[state=checked]:text-white transition-colors duration-200",
    },
    {
      name: "Posuvné (Šedá)",
      description: "Posune se a změní barvu na šedou při zaškrtnutí.",
      type: "checkbox",
      className:
        "data-[state=checked]:translate-x-1 data-[state=checked]:bg-gray-500 data-[state=checked]:text-white transition-all duration-200",
    },
    {
      name: "Přepínač (Toggle)",
      description: "Jednoduchý přepínač pro zapnutí/vypnutí.",
      type: "switch",
    },
    {
      name: "Ikona (Check/Cross)",
      description: "Zaškrtávací políčko založené na ikonách.",
      type: "icon",
    },
  ]

  return (
    <Card className="p-4 bg-card text-card-foreground shadow-lg max-w-4xl mx-auto">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-foreground text-center">
          Ukázky animovaných zaškrtávacích políček
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {checkboxTypes.map((type, index) => (
          <div key={index} className="flex items-center space-x-3">
            {type.type === "checkbox" && (
              <>
                <Checkbox
                  id={`checkbox-${index}`}
                  checked={checkedStates[index]}
                  onCheckedChange={() => handleCheck(index)}
                  className={`${type.className} ${type.checkClassName || ""}`}
                />
                <Label htmlFor={`checkbox-${index}`} className="text-base cursor-pointer text-foreground">
                  <span className="font-medium">{type.name}:</span> {type.description}
                </Label>
              </>
            )}
            {type.type === "switch" && (
              <>
                <Switch
                  id={`switch-${index}`}
                  checked={checkedStates[index]}
                  onCheckedChange={() => handleCheck(index)}
                />
                <Label htmlFor={`switch-${index}`} className="text-base cursor-pointer text-foreground">
                  <span className="font-medium">{type.name}:</span> {type.description}
                </Label>
              </>
            )}
            {type.type === "icon" && (
              <>
                <div
                  className="cursor-pointer"
                  onClick={() => handleCheck(index)}
                  role="checkbox"
                  aria-checked={checkedStates[index]}
                  tabIndex={0}
                >
                  {checkedStates[index] ? (
                    <CheckCircle className="h-6 w-6 text-green-500 transition-colors duration-200" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-500 transition-colors duration-200" />
                  )}
                </div>
                <Label className="text-base cursor-pointer text-foreground">
                  <span className="font-medium">{type.name}:</span> {type.description}
                </Label>
              </>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
