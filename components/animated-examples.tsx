import { Card, CardContent } from "@/components/ui/card"

interface AnimationType {
  bounce: string;
  bounceDesc: string;
  fade: string;
  fadeDesc: string;
  rotate: string;
  rotateDesc: string;
  scale: string;
  scaleDesc: string;
  slide: string;
  slideDesc: string;
}

interface AnimatedExamplesProps {
  animationTypes: AnimationType;
}

export function AnimatedExamples({ animationTypes }: AnimatedExamplesProps) {
  const animations = [
    {
      name: animationTypes.bounce,
      className: "animate-bounce-custom",
      emoji: "👋",
      description: animationTypes.bounceDesc,
    },
    {
      name: animationTypes.fade,
      className: "animate-fade-in-out",
      emoji: "✨",
      description: animationTypes.fadeDesc,
    },
    {
      name: animationTypes.rotate,
      className: "animate-rotate-3d",
      emoji: "🔄",
      description: animationTypes.rotateDesc,
    },
    {
      name: animationTypes.scale,
      className: "animate-scale-pulse",
      emoji: "💖",
      description: animationTypes.scaleDesc,
    },
    {
      name: animationTypes.slide,
      className: "animate-slide-in-out",
      emoji: "➡️",
      description: animationTypes.slideDesc,
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
