import { Card, CardContent } from "@/components/ui/card"

export function AnimatedExamples() {
  const animations = [
    {
      name: "Bounce",
      className: "animate-bounce-custom",
      emoji: "👋",
      description: "A simple bouncing effect.",
    },
    {
      name: "Fade In/Out",
      className: "animate-fade-in-out",
      emoji: "✨",
      description: "Fades in and out smoothly.",
    },
    {
      name: "Rotate 3D",
      className: "animate-rotate-3d",
      emoji: "🔄",
      description: "Rotates on its Y-axis.",
    },
    {
      name: "Scale Pulse",
      className: "animate-scale-pulse",
      emoji: "💖",
      description: "Grows and shrinks gently.",
    },
    {
      name: "Slide In/Out",
      className: "animate-slide-in-out",
      emoji: "➡️",
      description: "Slides horizontally.",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-6xl mx-auto">
      {animations.map((anim, index) => (
        <Card key={index} className="flex flex-col items-center justify-center p-6 text-center">
          <CardContent className="p-0 flex flex-col items-center justify-center">
            <div
              className={`w-24 h-24 rounded-lg bg-white/20 flex items-center justify-center text-5xl mb-4 ${anim.className}`}
            >
              {anim.emoji}
            </div>
            <h3 className="text-xl font-semibold mb-2">{anim.name}</h3>
            <p className="text-sm opacity-80">{anim.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
