import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel"
import { useEffect, useState } from "react"

export function WebExamplesSlider() {
  const [api, setApi] = useState<CarouselApi>()

  // Auto-advance the carousel every 5 seconds
  useEffect(() => {
    if (!api) return

    const interval = setInterval(() => {
      api.scrollNext()
    }, 5000)

    return () => clearInterval(interval)
  }, [api])

  const images = [
    "/ekostat.png",
    "/nanobuild.png",
    "/recyclesound.png",
    "/superpricky.png",
    "/zodborovany.png",
    "/odhadyjiznicechy.png",
    "/vachuska.png", // Added the landing page image as well
  ]

  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-w-6xl mx-auto"
    >
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index} className="basis-full md:basis-1/2">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-video items-center justify-center p-6">
                  <Image
                    src={src || "/placeholder.svg"}
                    alt={`Web example ${index + 1}`}
                    width={1200}
                    height={800}
                    className="rounded-md object-cover w-full h-full"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
