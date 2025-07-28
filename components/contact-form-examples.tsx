import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Mail, User, Phone } from "lucide-react"

export function ContactFormExamples() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
      {/* Form Type 1: Simple */}
      <Card className="p-4 bg-card text-card-foreground shadow-lg border border-gray-200 dark:border-gray-700">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold">Jednoduchý formulář</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="simple-name">Jméno</Label>
            <Input id="simple-name" placeholder="Vaše jméno" className="p-3 text-base" />
          </div>
          <div>
            <Label htmlFor="simple-email">E-mail</Label>
            <Input id="simple-email" type="email" placeholder="Váš e-mail" className="p-3 text-base" />
          </div>
          <div>
            <Label htmlFor="simple-message">Zpráva</Label>
            <Textarea id="simple-message" placeholder="Vaše zpráva" className="p-3 text-base min-h-[100px]" />
          </div>
          <Button className="w-full py-3 text-lg">Odeslat</Button>
        </CardContent>
      </Card>

      {/* Form Type 2: With Icons (Labels removed) */}
      <Card className="p-4 bg-card text-card-foreground shadow-lg border border-blue-300 dark:border-blue-700">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold">Formulář s ikonami</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <Input id="icon-name" placeholder="Vaše jméno" className="pl-10 p-3 text-base" />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <Input id="icon-email" type="email" placeholder="Váš e-mail" className="pl-10 p-3 text-base" />
          </div>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <Input id="icon-phone" type="tel" placeholder="Váš telefon" className="pl-10 p-3 text-base" />
          </div>
          <div>
            <Textarea id="icon-message" placeholder="Vaše zpráva" className="p-3 text-base min-h-[100px]" />
          </div>
          <Button className="w-full py-3 text-lg bg-blue-600 hover:bg-blue-700">Odeslat</Button>
        </CardContent>
      </Card>

      {/* Form Type 3: Multi-column */}
      <Card className="p-4 bg-card text-card-foreground shadow-lg border border-green-300 dark:border-green-700">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold">Vícesloupcový formulář</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="multi-first-name">Křestní jméno</Label>
              <Input id="multi-first-name" placeholder="Křestní jméno" className="p-3 text-base" />
            </div>
            <div>
              <Label htmlFor="multi-last-name">Příjmení</Label>
              <Input id="multi-last-name" placeholder="Příjmení" className="p-3 text-base" />
            </div>
          </div>
          <div>
            <Label htmlFor="multi-email">E-mail</Label>
            <Input id="multi-email" type="email" placeholder="E-mailová adresa" className="p-3 text-base" />
          </div>
          <div>
            <Label htmlFor="multi-subject">Předmět</Label>
            <Input id="multi-subject" placeholder="Předmět" className="p-3 text-base" />
          </div>
          <div>
            <Label htmlFor="multi-message">Zpráva</Label>
            <Textarea id="multi-message" placeholder="Vaše zpráva" className="p-3 text-base min-h-[100px]" />
          </div>
          <Button className="w-full py-3 text-lg bg-green-600 hover:bg-green-700">Odeslat zprávu</Button>
        </CardContent>
      </Card>

      {/* Form Type 4: Rounded & Colored */}
      <Card className="p-6 bg-gradient-to-br from-blue-400 to-purple-500 text-white shadow-xl rounded-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold text-white">Zaoblený a barevný formulář</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="round-name" className="text-white">
              Jméno
            </Label>
            <Input
              id="round-name"
              placeholder="Vaše jméno"
              className="rounded-full p-3 text-base bg-white/20 border-none placeholder:text-white/70 focus:ring-2 focus:ring-white"
            />
          </div>
          <div>
            <Label htmlFor="round-email" className="text-white">
              E-mail
            </Label>
            <Input
              id="round-email"
              type="email"
              placeholder="Váš e-mail"
              className="rounded-full p-3 text-base bg-white/20 border-none placeholder:text-white/70 focus:ring-2 focus:ring-white"
            />
          </div>
          <div>
            <Label htmlFor="round-message" className="text-white">
              Zpráva
            </Label>
            <Textarea
              id="round-message"
              placeholder="Vaše zpráva"
              className="rounded-2xl p-3 text-base bg-white/20 border-none placeholder:text-white/70 focus:ring-2 focus:ring-white min-h-[100px]"
            />
          </div>
          <Button className="w-full py-3 text-lg bg-white text-blue-600 hover:bg-gray-100 rounded-full">
            Odeslat OK
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
