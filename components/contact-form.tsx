"use client"

import { useFormStatus } from "react-dom"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { sendEmail } from "@/app/actions/send-email"

interface ContactFormProps {
  lang: "cz" | "en"
}

function SubmitButton({ lang, isSubmitting }: { lang: 'cz' | 'en', isSubmitting: boolean }) {
  const translations = {
    cz: {
      submit: "Odeslat zprávu",
      sending: "Odesílám..."
    },
    en: {
      submit: "Send Message",
      sending: "Sending..."
    }
  }
  
  return (
    <Button type="submit" className="w-full" disabled={isSubmitting}>
      {isSubmitting ? translations[lang].sending : translations[lang].submit}
    </Button>
  )
}

export function ContactForm({ lang }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const gdprAgreed = formData.get("gdprAgreed") === "on"

    if (!gdprAgreed) {
      toast({
        title: lang === "cz" ? "Chyba" : "Error",
        description:
          lang === "cz"
            ? "Musíte souhlasit se zpracováním osobních údajů."
            : "You must agree to the processing of personal data.",
        variant: "destructive",
      })
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const result = await sendEmail(null, formData)
      
      if (result.success) {
        // Reset the form on success if it still exists
        if (e.currentTarget) {
          e.currentTarget.reset()
        }
        
        toast({
          title: lang === "cz" ? "Úspěch" : "Success",
          description: result.message || (lang === "cz" 
            ? "Zpráva byla úspěšně odeslána!" 
            : "Message sent successfully!"),
          variant: "default",
        })
      } else {
        toast({
          title: lang === "cz" ? "Chyba" : "Error",
          description: result.message || (lang === "cz"
            ? "Při odesílání zprávy došlo k chybě."
            : "An error occurred while sending the message."),
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error sending email:", error)
      toast({
        title: lang === "cz" ? "Chyba" : "Error",
        description: lang === "cz"
          ? "Při odesílání zprávy došlo k chybě."
          : "An error occurred while sending the message.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const translations = {
    cz: {
      name: "Vaše jméno a příjmení",
      email: "Váš e-mail",
      phone: "Váš telefon",
      message: "Vaše zpráva",
      gdpr: "Souhlasím se zpracováním osobních údajů (GDPR) dle EU",
      submit: "Odeslat zprávu",
    },
    en: {
      name: "Your Name and Surname",
      email: "Your Email",
      phone: "Your Phone",
      message: "Your Message",
      gdpr: "I agree with the processing of personal data (GDPR) according to the EU",
      submit: "Send Message",
    },
  }

  const t = translations[lang]

  return (
    <form id="contact-form" onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">{t.name}</Label>
        <Input id="name" name="name" required />
      </div>
      <div>
        <Label htmlFor="email">{t.email}</Label>
        <Input id="email" type="email" name="email" required />
      </div>
      <div>
        <Label htmlFor="phone">{t.phone}</Label>
        <Input id="phone" type="tel" name="phone" />
      </div>
      <div>
        <Label htmlFor="message">{t.message}</Label>
        <Textarea id="message" name="message" required rows={5} />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="gdprAgreed" name="gdprAgreed" />
        <Label
          htmlFor="gdprAgreed"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {t.gdpr}
        </Label>
      </div>
      <SubmitButton lang={lang} isSubmitting={isSubmitting} />
    </form>
  )
}
