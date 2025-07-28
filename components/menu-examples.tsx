"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"
import Link from "next/link"

interface MenuExamplesProps {
  scrollToSection: (id: string) => void;
  menu: {
    simple: string;
    websites: string;
    animations: string;
    forms: string;
    menu: string;
    other: string;
    dropdown: string;
    openMenu: string;
    mobileSidebar: string;
    openSidebar: string;
  };
}

export function MenuExamples({ scrollToSection, menu }: MenuExamplesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {/* Menu Type 1: Simple Horizontal */}
      <Card className="p-4 bg-card text-card-foreground shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold">{menu.simple}</CardTitle>
        </CardHeader>
        <CardContent>
          <nav className="flex flex-wrap justify-center gap-2">
            <Button variant="ghost" onClick={() => scrollToSection("web-examples")} className="text-base px-4 py-2">
              Weby
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("animation-examples")}
              className="text-base px-4 py-2"
            >
              Animace
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("contact-form-examples")}
              className="text-base px-4 py-2"
            >
              Formuláře
            </Button>
            <Button variant="ghost" onClick={() => scrollToSection("menu-examples")} className="text-base px-4 py-2">
              Menu
            </Button>
            <Button variant="ghost" onClick={() => scrollToSection("other-features")} className="text-base px-4 py-2">
              Ostatní
            </Button>
          </nav>
        </CardContent>
      </Card>

      {/* Menu Type 2: Dropdown Menu */}
      <Card className="p-4 bg-card text-card-foreground shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold">{menu.dropdown}</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-full">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="py-3 px-6 text-lg bg-transparent">
                {menu.openMenu}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem onClick={() => scrollToSection("web-examples")} className="py-2 text-base">
                Weby
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => scrollToSection("animation-examples")} className="py-2 text-base">
                Animace
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => scrollToSection("contact-form-examples")} className="py-2 text-base">
                Formuláře
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => scrollToSection("menu-examples")} className="py-2 text-base">
                Menu
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => scrollToSection("other-features")} className="py-2 text-base">
                Ostatní
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>

      {/* Menu Type 3: Mobile Sidebar */}
      <Card className="p-4 bg-card text-card-foreground shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold">{menu.mobileSidebar}</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-full">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="lg" className="py-3 px-6 text-lg bg-transparent">
                <MenuIcon className="h-6 w-6 mr-2" />
                {menu.openSidebar}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[350px] p-6">
              <nav className="flex flex-col gap-6 pt-8">
                <Link
                  href="#"
                  onClick={() => scrollToSection("web-examples")}
                  className="text-xl font-medium hover:text-primary transition-colors"
                >
                  Weby
                </Link>
                <Link
                  href="#"
                  onClick={() => scrollToSection("animation-examples")}
                  className="text-xl font-medium hover:text-primary transition-colors"
                >
                  Animace
                </Link>
                <Link
                  href="#"
                  onClick={() => scrollToSection("contact-form-examples")}
                  className="text-xl font-medium hover:text-primary transition-colors"
                >
                  Formuláře
                </Link>
                <Link
                  href="#"
                  onClick={() => scrollToSection("menu-examples")}
                  className="text-xl font-medium hover:text-primary transition-colors"
                >
                  Menu
                </Link>
                <Link
                  href="#"
                  onClick={() => scrollToSection("other-features")}
                  className="text-xl font-medium hover:text-primary transition-colors"
                >
                  Ostatní
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </CardContent>
      </Card>
    </div>
  )
}
