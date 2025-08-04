'use client'

import { Phone, Mail, MessageSquare, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export function FloatingContactButton() {
  const [isExpanded, setIsExpanded] = useState(false)
  const phoneNumber = '774104020'
  
  const toggleExpand = () => setIsExpanded(!isExpanded)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {isExpanded && (
        <div className="flex flex-col gap-2 mb-2 animate-in fade-in-50 slide-in-from-bottom-2">
          <Button 
            asChild 
            className="rounded-full w-12 h-12 p-0" 
            variant="outline"
            onClick={(e) => e.stopPropagation()}
          >
            <a 
              href="mailto:odhadyvachuska@gmail.com" 
              aria-label="Send email"
              onClick={(e) => e.stopPropagation()}
            >
              <Mail className="h-5 w-5" />
            </a>
          </Button>
          <Button asChild className="rounded-full w-12 h-12 p-0" variant="outline">
            <Link href={`tel:${phoneNumber}`} aria-label={`Call ${phoneNumber}`}>
              <Phone className="h-5 w-5" />
            </Link>
          </Button>
          <Button asChild className="rounded-full w-12 h-12 p-0" variant="outline">
            <Link href={`https://wa.me/420${phoneNumber}`} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
              <MessageSquare className="h-5 w-5" />
            </Link>
          </Button>
          <Button asChild className="rounded-full w-12 h-12 p-0" variant="outline">
            <Link href="/odhady#contact-form" aria-label="Contact Form" onClick={() => {
              // Close the menu after clicking the link
              setIsExpanded(false);
            }}>
              <MessageCircle className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      )}
      <Button 
        onClick={toggleExpand}
        className="rounded-full w-14 h-14 p-0 text-lg font-semibold shadow-lg"
        aria-label={isExpanded ? 'Close contact options' : 'Contact us'}
      >
        {isExpanded ? '×' : <Mail className="h-6 w-6" />}
      </Button>
    </div>
  )
}
