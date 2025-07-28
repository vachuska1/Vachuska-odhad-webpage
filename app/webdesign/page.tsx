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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"
import { Sun } from "lucide-react"
import { Moon } from "lucide-react"

export default function WebdesignPage() {
  const [lang, setLang] = useState<"cz" | "en">("cz")
  const { theme, setTheme } = useTheme()

  const translations = {
    cz: {
      title: "Tvorba webových stránek",
      intro:
        "Tvořím moderní a rychlé weby pro prezentaci osob i firem s využitím nejnovějších technologií, jako jsou React, Next.js a Framer Motion. Weby jsou výkonné, bezpečné a uživatelsky přívětivé.",
      examples: "Ukázky webů",
      animations: "Ukázky animací",
      contactForms: "Ukázky kontaktních formulářů",
      menus: "Ukázky Menu a navigace",
      other: "Ostatní",
      parallaxHero: "Obrázky s efekty posouvání", // Updated title
      animatedCheckboxes: "Animovaná zaškrtávací políčka",
      backToHome: "Zpět na úvod",
      allRightsReserved: "Všechna práva vyhrazena.",
    },
    en: {
      title: "Web Page Development",
      intro:
        "I create modern and fast websites for personal and business presentation using the latest technologies such as React, Next.js, and Framer Motion. Websites are powerful, secure, and user-friendly.",
      examples: "Web Examples",
      animations: "Animation Examples",
      contactForms: "Contact Form Examples",
      menus: "Menu and Navigation Examples",
      other: "Other Features",
      parallaxHero: "Parallax Images with Scroll Effects", // Updated title
      animatedCheckboxes: "Animated Checkboxes",
      backToHome: "Back to Home",
      allRightsReserved: "All rights reserved.",
    },
  }

  const t = translations[lang]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Updated backgroundClass to use theme-aware colors
  const backgroundClass =
    theme === "dark"
      ? "bg-gradient-to-br from-gray-800 to-gray-950 text-foreground"
      : "bg-gradient-to-br from-green-500 to-blue-500 text-foreground"

  return (
    <div className={`min-h-screen ${backgroundClass}`}>
      <header className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <Button variant="ghost" className="text-foreground hover:bg-accent">
            <ArrowLeft className="mr-2 h-4 w-4" /> {t.backToHome}
          </Button>
        </Link>
        {/* Dark mode toggle button for webdesign page */}
        <Button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          variant="outline"
          className="bg-transparent text-foreground border-border hover:bg-accent"
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        <LanguageToggle onLanguageChange={setLang} />
      </header>

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
                <nav className="flex flex-col gap-6 pt-8">
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
            title="Vytváříme digitální zážitky"
            subtitle="Moderní webdesign s důrazem na výkon a uživatelskou přívětivost."
          />
        </section>

        <section id="web-examples" className="py-24">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">{t.examples}</h2>
          <WebExamplesSlider />
        </section>

        <section id="animation-examples" className="py-24 text-center">
          <h2 className="text-3xl font-bold mb-6 text-foreground">{t.animations}</h2>
          <AnimatedExamples />
        </section>

        <section id="animated-checkboxes-section" className="py-24 text-center">
          <h2 className="text-3xl font-bold mb-6 text-foreground">{t.animatedCheckboxes}</h2>
          <AnimatedCheckboxes />
        </section>

        <section id="contact-form-examples" className="py-24 text-center">
          <h2 className="text-3xl font-bold mb-6 text-foreground">{t.contactForms}</h2>
          <ContactFormExamples />
        </section>

        <section id="menu-examples-section" className="py-24 text-center">
          <h2 className="text-3xl font-bold mb-6 text-foreground">{t.menus}</h2>
          <MenuExamples scrollToSection={scrollToSection} />
        </section>

        <section id="other-features" className="py-24 text-center">
          <h2 className="text-3xl font-bold mb-6 text-foreground">{t.other}</h2>
          <OtherFeatures />
        </section>
      </main>

      <footer className="bg-muted text-muted-foreground py-6 text-center">
        <p>
          &copy; {new Date().getFullYear()} Ing. Aleš Vachuška. {t.allRightsReserved}
        </p>
      </footer>
    </div>
  )
}
