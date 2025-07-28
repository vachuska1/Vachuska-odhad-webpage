"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { CheckCircle, XCircle } from "lucide-react"

interface AnimatedCheckboxesProps {
  checkboxes: {
    title: string;
    standard: string;
    growing: string;
    pulsing: string;
    rotating: string;
    rounded: string;
    sliding: string;
    toggle: string;
    icon: string;
  };
}

export function AnimatedCheckboxes({ checkboxes }: AnimatedCheckboxesProps) {
  const [checkedStates, setCheckedStates] = useState(Array(8).fill(false))

  const handleCheck = (index: number) => {
    setCheckedStates((prev) => {
      const newStates = [...prev]
      newStates[index] = !newStates[index]
      return newStates
    })
  }

  const checkboxTypes = [
    {
      name: checkboxes.standard,
      type: "checkbox",
      className: "data-[state=checked]:bg-red-500 data-[state=checked]:text-white transition-colors duration-200",
    },
    {
      name: checkboxes.growing,
      type: "checkbox",
      className:
        "data-[state=checked]:scale-[3] data-[state=checked]:bg-purple-500 data-[state=checked]:text-white transition-all duration-200",
    },
    {
      name: checkboxes.pulsing,
      type: "checkbox",
      className: "data-[state=checked]:bg-yellow-500 data-[state=checked]:text-white transition-colors duration-200",
      checkClassName: "data-[state=checked]:animate-pulse-once",
    },
    {
      name: checkboxes.rotating,
      type: "checkbox",
      className:
        "data-[state=checked]:rotate-12 data-[state=checked]:bg-green-500 data-[state=checked]:text-white transition-all duration-200",
    },
    {
      name: checkboxes.rounded,
      type: "checkbox",
      className:
        "rounded-full data-[state=checked]:bg-blue-500 data-[state=checked]:text-white transition-colors duration-200",
    },
    {
      name: checkboxes.sliding,
      type: "checkbox",
      className:
        "data-[state=checked]:translate-x-1 data-[state=checked]:bg-gray-500 data-[state=checked]:text-white transition-all duration-200",
    },
    {
      name: checkboxes.toggle,
      type: "switch",
    },
    {
      name: checkboxes.icon.split(":")[0],
      description: checkboxes.icon.split(":")[1].trim(),
      type: "icon",
    },
  ]

  return (
    <Card className="p-4 bg-card text-card-foreground shadow-lg max-w-4xl mx-auto">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-foreground text-center">
          {checkboxes.title}
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
