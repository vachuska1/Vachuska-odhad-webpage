"use client"

import { useState } from "react"
import { LanguageToggle } from "@/components/language-toggle"
import { WebExamplesSlider } from "@/components/web-examples-slider"
import { AnimatedExamples } from "@/components/animated-examples"
import { ContactFormExamples } from "@/components/contact-form-examples"
import { MenuExamples } from "@/components/menu-examples"
import { OtherFeatures } from "@/components/other-features"
import { ParallaxHero } from "@/components/parallax-hero"
import { AnimatedCheckboxes } from "@/components/animated-checkboxes"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function WebdesignPage() {
  // Using 'cz' type to match translations object, but internally treating it as 'cs'
  const [lang, setLang] = useState<"cz" | "en">("cz")
  const { theme } = useTheme()

  const translations = {
    cz: {
      title: "Tvorba webových stránek",
      intro: "Moderní a responzivní webové stránky šité na míru vašim potřebám. Od jednoduchých prezentací až po složité webové aplikace.",
      examples: "Ukázky prací",
      animations: "Animace",
      contactForms: "Kontaktní formuláře",
      menus: "Menu a navigace",
      other: "Další prvky",
      parallaxHero: "Mizející efekt",
      animatedCheckboxes: "Animované checkboxy",
      backToHome: "Zpět na úvod",
      allRightsReserved: "Všechna práva vyhrazena.",
      heroTitle: "Vytvářím digitální zážitky",
      heroSubtitle: "Moderní webdesign s důrazem na výkon a uživatelskou přívětivost.",
      navigation: "Navigace",
      contact: "Kontakt",
      animationTypes: {
        bounce: "Odrazit se",
        bounceDesc: "Jednoduchý efekt odrazu.",
        fade: "Zesílení/Ztráta",
        fadeDesc: "Plynule se zobrazují a zanikají.",
        rotate: "Otočit 3D",
        rotateDesc: "Otáčí se kolem osy Y.",
        scale: "Pulzní změna měřítka",
        scaleDesc: "Jemně se zvětšuje a zmenšuje.",
        slide: "Posunout se/Ztráta",
        slideDesc: "Posune se vodorovně."
      },
      checkboxes: {
        title: "Ukázky animovaných zaškrtávacích políček",
        standard: "Standardní",
        growing: "Zvětšující se",
        pulsing: "Pulzující",
        rotating: "Otočné",
        rounded: "Zaoblené",
        sliding: "Posuvné",
        toggle: "Přepínač",
        icon: "Ikona: Měnící"
      },
      forms: {
        title: "Moje formuláře",
        simpleForm: {
          title: "Jednoduchý formulář",
          name: "Jméno",
          namePlaceholder: "Vaše jméno",
          email: "E-mail",
          emailPlaceholder: "Váš e-mail",
          message: "Zpráva",
          messagePlaceholder: "Vaše zpráva",
          submit: "Odeslat"
        },
        iconForm: {
          title: "Formulář s ikonami",
          submit: "Odeslat"
        },
        multiColumnForm: {
          title: "Vícesloupcový formulář",
          firstName: "Křestní jméno",
          firstNamePlaceholder: "Křestní jméno",
          lastName: "Příjmení",
          lastNamePlaceholder: "Příjmení",
          email: "E-mail",
          emailPlaceholder: "E-mailová adresa",
          subject: "Předmět",
          subjectPlaceholder: "Předmět",
          message: "Zpráva",
          messagePlaceholder: "Vaše zpráva",
          submit: "Odeslat zprávu"
        },
        roundedForm: {
          title: "Zaoblený a barevný formulář",
          submit: "Odeslat OK"
        }
      },
      menu: {
        simple: "Jednoduché horizontální menu",
        websites: "Weby",
        animations: "Animace",
        forms: "Formuláře",
        menu: "Menu",
        other: "Ostatní",
        dropdown: "Rozbalovací menu",
        openMenu: "Otevřít menu",
        mobileSidebar: "Mobilní boční panel",
        openSidebar: "Otevřít boční panel"
      },
      otherFeatures: {
        darkModeToggle: "Přepínač tmavého režimu",
        darkMode: "Tmavý režim",
        liveSearch: "Živý vyhledávací vstup",
        searchPlaceholder: "Hledat položky...",
        dragToReorder: "Přetažení pro změnu pořadí",
        dragToReorderDesc: "Přetáhněte položky pro změnu pořadí.",
        scrollIndicator: {
          title: "Animovaný indikátor posouvání (posouvejte tuto kartu)",
          items: Array(10).fill(0).map((_, i) => `Položka posouvání ${i + 1}`)
        },
        hoverEffect: {
          title: "Vlastní efekt najetí myší",
          hover: "Najeďte myší",
          cardTitle: "Karta s efektem najetí",
          cardDesc: "Objevte více po najetí myší."
        }
      }
    },
    en: {
      title: "Web Page Development",
      intro:
        "I create modern and fast websites for personal and business presentation using the latest technologies such as React, Next.js, and Framer Motion. Websites are powerful, secure, and user-friendly.",
      examples: "Web",
      animations: "Animations",
      contactForms: "Forms",
      menus: "Menu and Navigation",
      other: "Other Features",
      parallaxHero: "Scroll Effect",
      animatedCheckboxes: "Checkboxes",
      backToHome: "Back to Home",
      allRightsReserved: "All rights reserved.",
      heroTitle: "Creating Digital Experiences",
      heroSubtitle: "Modern web design with a focus on performance and user-friendliness.",
      animationTypes: {
        bounce: "Bounce",
        bounceDesc: "A simple bouncing effect.",
        fade: "Fade In/Out",
        fadeDesc: "Fades in and out smoothly.",
        rotate: "Rotate 3D",
        rotateDesc: "Rotates on its Y-axis.",
        scale: "Scale Pulse",
        scaleDesc: "Grows and shrinks gently.",
        slide: "Slide In/Out",
        slideDesc: "Slides horizontally."
      },
      checkboxes: {
        title: "Animated Checkbox Examples",
        standard: "Standard",
        growing: "Growing",
        pulsing: "Pulsing",
        rotating: "Rotating",
        rounded: "Rounded",
        sliding: "Sliding",
        toggle: "Toggle",
        icon: "Icon: Changing"
      },
      forms: {
        title: "My Forms",
        simpleForm: {
          title: "Simple Form",
          name: "Name",
          namePlaceholder: "Your name",
          email: "Email",
          emailPlaceholder: "Your email",
          message: "Message",
          messagePlaceholder: "Your message",
          submit: "Submit"
        },
        iconForm: {
          title: "Icon Form",
          submit: "Submit"
        },
        multiColumnForm: {
          title: "Multi-column Form",
          firstName: "First name",
          firstNamePlaceholder: "First name",
          lastName: "Last name",
          lastNamePlaceholder: "Last name",
          email: "Email",
          emailPlaceholder: "Email address",
          subject: "Subject",
          subjectPlaceholder: "Subject",
          message: "Message",
          messagePlaceholder: "Your message",
          submit: "Send message"
        },
        roundedForm: {
          title: "Rounded and Colored Form",
          submit: "Send OK"
        }
      },
      menu: {
        simple: "Simple Horizontal Menu",
        websites: "Websites",
        animations: "Animations",
        forms: "Forms",
        menu: "Menu",
        other: "Other",
        dropdown: "Dropdown Menu",
        openMenu: "Open Menu",
        mobileSidebar: "Mobile Sidebar",
        openSidebar: "Open Sidebar"
      },
      otherFeatures: {
        darkModeToggle: "Dark Mode Toggle",
        darkMode: "Dark Mode",
        liveSearch: "Live Search Input",
        searchPlaceholder: "Search for Items...",
        dragToReorder: "Drag to Reorder",
        dragToReorderDesc: "Drag items to reorder.",
        scrollIndicator: {
          title: "Animated scroll indicator (scroll this tab)",
          items: Array(10).fill(0).map((_, i) => `Scroll item ${i + 1}`)
        },
        hoverEffect: {
          title: "Custom Hover Effect",
          hover: "Hover",
          cardTitle: "Hover Card",
          cardDesc: "Discover more on hover."
        }
      }
    },
  }

  // Map 'cz' to 'cs' for the translations object
  const t = translations[lang]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-emerald-50 dark:bg-background text-foreground">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center text-foreground hover:text-primary transition-colors"
            title={t.backToHome}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
                clipRule="evenodd" 
              />
            </svg>
            <span className="ml-2 hidden sm:inline">{t.backToHome}</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <LanguageToggle 
              onLanguageChange={(newLang) => setLang(newLang as "cz" | "en")} 
            />
          </div>
        </div>
      </header>
      
      {/* Add padding to main content to account for fixed header */}
      <div className="pt-16">
        {/* Section Navigation */}
        <nav className="sticky top-0 z-10 bg-background/90 backdrop-blur-sm py-3 shadow-lg">
        <div className="container mx-auto px-4 flex items-center justify-between md:justify-center">
          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-wrap justify-center gap-4">
            <Button
              variant="ghost"
              onClick={() => scrollToSection("parallax-hero-section")}
              className="text-foreground hover:bg-accent"
            >
              {t.parallaxHero}
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("web-examples")}
              className="text-foreground hover:bg-accent"
            >
              {t.examples}
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("animation-examples")}
              className="text-foreground hover:bg-accent"
            >
              {t.animations}
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("animated-checkboxes-section")}
              className="text-foreground hover:bg-accent"
            >
              {t.animatedCheckboxes}
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("contact-form-examples")}
              className="text-foreground hover:bg-accent"
            >
              {t.contactForms}
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("menu-examples-section")}
              className="text-foreground hover:bg-accent"
            >
              {t.menus}
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("other-features")}
              className="text-foreground hover:bg-accent"
            >
              {t.other}
            </Button>
          </div>

          {/* Mobile Navigation (Hamburger Menu) */}
          <div className="md:hidden flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground hover:bg-accent">
                  <MenuIcon className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] sm:w-[350px] p-6 bg-background text-foreground">
                <SheetTitle className="text-xl font-semibold mb-4">{t.menus}</SheetTitle>
                <nav className="flex flex-col gap-4">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      scrollToSection("parallax-hero-section")
                      document.getElementById("sheet-close-button")?.click()
                    }}
                    className="text-xl font-medium hover:text-primary transition-colors justify-start text-foreground"
                  >
                    {t.parallaxHero}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      scrollToSection("web-examples")
                      document.getElementById("sheet-close-button")?.click()
                    }}
                    className="text-xl font-medium hover:text-primary transition-colors justify-start text-foreground"
                  >
                    {t.examples}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      scrollToSection("animation-examples")
                      document.getElementById("sheet-close-button")?.click()
                    }}
                    className="text-xl font-medium hover:text-primary transition-colors justify-start text-foreground"
                  >
                    {t.animations}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      scrollToSection("animated-checkboxes-section")
                      document.getElementById("sheet-close-button")?.click()
                    }}
                    className="text-xl font-medium hover:text-primary transition-colors justify-start text-foreground"
                  >
                    {t.animatedCheckboxes}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      scrollToSection("contact-form-examples")
                      document.getElementById("sheet-close-button")?.click()
                    }}
                    className="text-xl font-medium hover:text-primary transition-colors justify-start text-foreground"
                  >
                    {t.contactForms}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      scrollToSection("menu-examples-section")
                      document.getElementById("sheet-close-button")?.click()
                    }}
                    className="text-xl font-medium hover:text-primary transition-colors justify-start text-foreground"
                  >
                    {t.menus}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      scrollToSection("other-features")
                      document.getElementById("sheet-close-button")?.click()
                    }}
                    className="text-xl font-medium hover:text-primary transition-colors justify-start text-foreground"
                  >
                    {t.other}
                  </Button>
                </nav>
                {/* Hidden button to programmatically close the sheet */}
                <button id="sheet-close-button" className="hidden" />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4">
        <section className="py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-foreground">{t.title}</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground">{t.intro}</p>
        </section>

        <section id="parallax-hero-section" className="py-24">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">{t.parallaxHero}</h2>
          <ParallaxHero
            imageUrl="/vachuska.png"
            title={t.heroTitle}
            subtitle={t.heroSubtitle}
          />
        </section>

        <section id="web-examples" className="py-24">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">{t.examples}</h2>
          <WebExamplesSlider />
        </section>

        <section id="animation-examples" className="py-24 text-center">
          <h2 className="text-3xl font-bold mb-6 text-foreground">{t.animations}</h2>
          <AnimatedExamples animationTypes={t.animationTypes} />
        </section>

        <section id="animated-checkboxes-section" className="py-24 text-center">
          <h2 className="text-3xl font-bold mb-6 text-foreground">{t.animatedCheckboxes}</h2>
          <AnimatedCheckboxes checkboxes={t.checkboxes} />
        </section>

        <section id="contact-form-examples" className="py-24 text-center">
          <h2 className="text-3xl font-bold mb-6 text-foreground">{t.contactForms}</h2>
          <ContactFormExamples lang={lang} forms={t.forms} />
        </section>

        <section id="menu-examples-section" className="py-24 text-center">
          <h2 className="text-3xl font-bold mb-6 text-foreground">{t.menus}</h2>
          <MenuExamples scrollToSection={scrollToSection} menu={t.menu} />
        </section>

        <section id="other-features" className="py-24 text-center">
          <h2 className="text-3xl font-bold mb-6 text-foreground">{t.other}</h2>
          <OtherFeatures 
            darkModeToggle={t.otherFeatures.darkModeToggle}
            darkMode={t.otherFeatures.darkMode}
            liveSearch={t.otherFeatures.liveSearch}
            searchPlaceholder={t.otherFeatures.searchPlaceholder}
            dragToReorder={t.otherFeatures.dragToReorder}
            dragToReorderDesc={t.otherFeatures.dragToReorderDesc}
            scrollIndicator={t.otherFeatures.scrollIndicator}
            hoverEffect={t.otherFeatures.hoverEffect}
            lang={lang === 'cz' ? 'cs' : lang}
          />
        </section>
      </main>
      </div> {/* End of padding div */}
      
      {/* Footer */}
      <footer className="bg-background border-t border-border mt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Left Column - Navigation */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{lang === 'cz' ? 'Navigace' : 'Navigate'}</h3>
              <nav className="flex flex-col space-y-2">
                <a href="#parallax-hero-section" className="hover:text-primary transition-colors">
                  {t.parallaxHero}
                </a>
                <a href="#web-examples" className="hover:text-primary transition-colors">
                  {t.examples}
                </a>
                <a href="#animation-examples" className="hover:text-primary transition-colors">
                  {t.animations}
                </a>
                <a href="#contact-form-examples" className="hover:text-primary transition-colors">
                  {t.contactForms}
                </a>
                <a href="#menu-examples-section" className="hover:text-primary transition-colors">
                  {t.menus}
                </a>
                <a href="#other-features" className="hover:text-primary transition-colors">
                  {t.other}
                </a>
                <a href="#animated-checkboxes-section" className="hover:text-primary transition-colors">
                  {t.animatedCheckboxes}
                </a>
              </nav>
            </div>
            
            {/* Right Column - Contact */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{lang === 'cz' ? 'Kontakt' : 'Contact'}</h3>
              <div className="space-y-2">
                <p className="font-medium">Ing. Aleš Vachuška</p>
                <p className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <a href="tel:+420774104020" className="hover:text-primary transition-colors">774 104 020</a>
                </p>
                <p className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <a href="mailto:odhadyvachuska@gmail.com" className="hover:text-primary transition-colors">
                    odhadyvachuska@gmail.com
                  </a>
                </p>

              </div>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="border-t border-border pt-6 text-center text-sm text-muted-foreground">
            <p> {new Date().getFullYear()} Ing. Aleš Vachuška. {t.allRightsReserved}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
