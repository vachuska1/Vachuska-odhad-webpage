import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden bg-gradient-to-br from-green-500 via-blue-500 to-purple-500">
      {/* Global Title */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 neon-blue-light-subtle drop-shadow-lg">
          Ing. Aleš Vachuška
        </h1>
      </div>

      <main className="flex-1 flex flex-col md:flex-row relative">
        {/* Odhady Section */}
        <Link
          href="/odhady"
          className="relative flex-1 flex items-center justify-center overflow-hidden group min-h-[50vh] md:min-h-screen
                     md:clip-path-diagonal-left"
        >
          <Image
            src="/gen8.webp"
            alt="Odhady nemovitostí"
            fill
            style={{ objectFit: "cover" }}
            className="transition-transform duration-300 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-4 transition-opacity duration-300 group-hover:bg-black/30">
            <p className="text-xl md:text-3xl font-semibold text-gray-800 neon-blue-light-subtle drop-shadow-lg">
              OCEŇOVÁNÍ NEMOVITÝCH VĚCÍ
            </p>
          </div>
        </Link>

        {/* Webdesign Section */}
        <Link
          href="/webdesign"
          className="relative flex-1 flex items-center justify-center overflow-hidden group min-h-[50vh] md:min-h-screen
                     md:clip-path-diagonal-right"
        >
          <Image
            src="/gen2.webp"
            alt="Tvorba webu - Web Design"
            fill
            style={{ objectFit: "cover" }}
            className="transition-transform duration-300 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-4 transition-opacity duration-300 group-hover:bg-black/30">
            <p className="text-xl md:text-3xl font-semibold text-gray-800 neon-blue-light-subtle drop-shadow-lg">
              TVORBA WEBU, WEB DESIGN
            </p>
          </div>
        </Link>
      </main>
    </div>
  )
}
