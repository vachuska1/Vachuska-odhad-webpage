'use client'

import Link from 'next/link'
import { MapPinIcon } from 'lucide-react'

export function LocalServiceArea() {
  return (
    <div className="sr-only" aria-hidden="false">
      <h2>Působnost - Plzeňský kraj</h2>
      <ul>
        {['Strakonice', 'Blatná', 'Horazdovice', 'Klatovy', 'Nepomuk', 'Plzeň'].map((city) => (
          <li key={city}>
            <a href={`https://odhadyvachuska.cz/sluzby/${city.toLowerCase()}`}>
              Odhady nemovitostí {city}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
