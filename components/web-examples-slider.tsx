import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export function WebExamplesSlider() {
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
      opts={{
        align: "start",
      }}
      className="w-full max-w-4xl mx-auto"
    >
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index} className="basis-full sm:basis-1/2 lg:basis-1/2">
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
