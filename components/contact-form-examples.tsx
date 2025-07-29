import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Mail, User, Phone } from "lucide-react"

interface ContactFormExamplesProps {
  lang: 'cz' | 'en';
  forms: {
    title: string;
    simpleForm: {
      title: string;
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
    };
    iconForm: {
      title: string;
      submit: string;
    };
    multiColumnForm: {
      title: string;
      firstName: string;
      firstNamePlaceholder: string;
      lastName: string;
      lastNamePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      subject: string;
      subjectPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
    };
    roundedForm: {
      title: string;
      submit: string;
    };
  };
}

export function ContactFormExamples({ lang, forms }: ContactFormExamplesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
      {/* Form Type 1: Simple */}
      <Card className="p-4 bg-card text-card-foreground shadow-lg border border-gray-200 dark:border-gray-700">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold">{forms.simpleForm.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="simple-name">{forms.simpleForm.name}</Label>
            <Input id="simple-name" placeholder={forms.simpleForm.namePlaceholder} className="p-3 text-base" />
          </div>
          <div>
            <Label htmlFor="simple-email">{forms.simpleForm.email}</Label>
            <Input id="simple-email" type="email" placeholder={forms.simpleForm.emailPlaceholder} className="p-3 text-base" />
          </div>
          <div>
            <Label htmlFor="simple-message">{forms.simpleForm.message}</Label>
            <Textarea id="simple-message" placeholder={forms.simpleForm.messagePlaceholder} className="p-3 text-base min-h-[100px]" />
          </div>
          <Button className="w-full py-3 text-lg">{forms.simpleForm.submit}</Button>
        </CardContent>
      </Card>

      {/* Form Type 2: With Icons (Labels removed) */}
      <Card className="p-4 bg-card text-card-foreground shadow-lg border border-blue-300 dark:border-blue-700">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold">{forms.iconForm.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="relative flex items-center">
              <User className="text-gray-400 mr-2" size={20} />
              <Input 
                id="icon-name" 
                placeholder={forms.simpleForm.namePlaceholder} 
                className="flex-1 p-3 text-base"
              />
            </div>
            <div className="relative flex items-center">
              <Mail className="text-gray-400 mr-2" size={20} />
              <Input 
                id="icon-email" 
                type="email" 
                placeholder={forms.simpleForm.emailPlaceholder} 
                className="flex-1 p-3 text-base"
              />
            </div>
            <div className="relative flex items-center">
              <Phone className="text-gray-400 mr-2" size={20} />
              <Input 
                id="icon-phone" 
                type="tel" 
                placeholder={lang === 'cz' ? 'Telefon' : 'Phone'} 
                className="flex-1 p-3 text-base"
              />
            </div>
          </div>
          <div>
            <Textarea id="icon-message" placeholder={forms.simpleForm.messagePlaceholder} className="p-3 text-base min-h-[100px]" />
          </div>
          <Button className="w-full py-3 text-lg bg-blue-600 hover:bg-blue-700">{forms.iconForm.submit}</Button>
        </CardContent>
      </Card>

      {/* Form Type 3: Multi-column */}
      <Card className="p-4 bg-card text-card-foreground shadow-lg border border-green-300 dark:border-green-700">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold">{forms.multiColumnForm.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="multi-first-name">{forms.multiColumnForm.firstName}</Label>
              <Input id="multi-first-name" placeholder={forms.multiColumnForm.firstNamePlaceholder} className="p-3 text-base" />
            </div>
            <div>
              <Label htmlFor="multi-last-name">{forms.multiColumnForm.lastName}</Label>
              <Input id="multi-last-name" placeholder={forms.multiColumnForm.lastNamePlaceholder} className="p-3 text-base" />
            </div>
          </div>
          <div>
            <Label htmlFor="multi-email">{forms.multiColumnForm.email}</Label>
            <Input id="multi-email" type="email" placeholder={forms.multiColumnForm.emailPlaceholder} className="p-3 text-base" />
          </div>
          <div>
            <Label htmlFor="multi-subject">{forms.multiColumnForm.subject}</Label>
            <Input id="multi-subject" placeholder={forms.multiColumnForm.subjectPlaceholder} className="p-3 text-base" />
          </div>
          <div>
            <Label htmlFor="multi-message">{forms.multiColumnForm.message}</Label>
            <Textarea id="multi-message" placeholder={forms.multiColumnForm.messagePlaceholder} className="p-3 text-base min-h-[100px]" />
          </div>
          <Button className="w-full py-3 text-lg bg-green-600 hover:bg-green-700">{forms.multiColumnForm.submit}</Button>
        </CardContent>
      </Card>

      {/* Form Type 4: Rounded & Colored */}
      <Card className="p-6 bg-gradient-to-br from-blue-400 to-purple-500 text-white shadow-xl rounded-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold text-white">{forms.roundedForm.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="round-name" className="text-white">
              {forms.simpleForm.name}
            </Label>
            <Input
              id="round-name"
              placeholder={forms.simpleForm.namePlaceholder}
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
              placeholder={forms.simpleForm.emailPlaceholder}
              className="rounded-full p-3 text-base bg-white/20 border-none placeholder:text-white/70 focus:ring-2 focus:ring-white"
            />
          </div>
          <div>
            <Label htmlFor="round-message" className="text-white">
              {forms.simpleForm.message}
            </Label>
            <Textarea
              id="round-message"
              placeholder={forms.simpleForm.messagePlaceholder}
              className="rounded-2xl p-3 text-base bg-white/20 border-none placeholder:text-white/70 focus:ring-2 focus:ring-white min-h-[100px]"
            />
          </div>
          <Button className="w-full py-3 text-lg bg-white text-blue-600 hover:bg-gray-100 rounded-full">
            {forms.roundedForm.submit}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
