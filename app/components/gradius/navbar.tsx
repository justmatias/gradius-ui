"use client"

import { useState } from "react"
import { GraduationCap, Menu, X, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  onAuthOpen: (mode: "login" | "register") => void
}

export function Navbar({ onAuthOpen }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 glass glass-border border-b border-border/50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 glow-primary">
            <GraduationCap className="h-5 w-5 text-primary" />
          </div>
          <span className="text-xl font-semibold tracking-tight text-foreground">
            Gradius
          </span>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          <a href="#dashboard" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Dashboard
          </a>
          <a href="#map" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Degree Map
          </a>
          <a href="#upload" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Upload
          </a>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
            onClick={() => onAuthOpen("login")}
          >
            <LogIn className="mr-2 h-4 w-4" />
            Sign In
          </Button>
          <Button
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => onAuthOpen("register")}
          >
            Get Started
          </Button>
        </div>

        <button
          type="button"
          className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="glass border-t border-border/50 md:hidden animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-1 px-4 py-3">
            <a href="#dashboard" className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
              Dashboard
            </a>
            <a href="#map" className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
              Degree Map
            </a>
            <a href="#upload" className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
              Upload
            </a>
            <hr className="my-2 border-border/50" />
            <Button
              variant="ghost"
              size="sm"
              className="justify-start text-muted-foreground"
              onClick={() => { onAuthOpen("login"); setMobileMenuOpen(false) }}
            >
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Button>
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => { onAuthOpen("register"); setMobileMenuOpen(false) }}
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
