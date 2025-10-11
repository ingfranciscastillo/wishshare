"use client";
import { Button } from "@/components/ui/button";
import { useAuth, UserButton } from "@clerk/nextjs";
import { Menu, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ModeToggle } from "../modeToggle";
import heroImage from "@/assets/hero-image.jpg";
import { TextEffect } from "../motion-primitives/text-effect";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { AnimatedNumber } from "../motion-primitives/animated-number";

const menuItems = [
  { name: "Explorar Wishlists", href: "/explore" },
  { name: "Cómo funciona", href: "/how-it-works" },
  { name: "Contacto", href: "/contact" },
  { name: "Sobre nosotros", href: "/sobre-nosotros" },
];

export default function HeroSection() {
  const [menuState, setMenuState] = useState(false);

  const { userId } = useAuth();

  return (
    <>
      <header>
        <nav
          data-state={menuState && "active"}
          className="fixed z-20 w-full border-b border-dashed bg-white backdrop-blur md:relative dark:bg-zinc-950/50 lg:dark:bg-transparent"
        >
          <div className="m-auto max-w-5xl px-6">
            <div className="flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
              <div className="flex w-full justify-between lg:w-auto">
                <Link
                  href="/"
                  aria-label="home"
                  className="flex items-center space-x-2"
                >
                  WishShare
                </Link>

                <button
                  onClick={() => setMenuState(!menuState)}
                  aria-label={menuState == true ? "Close Menu" : "Open Menu"}
                  className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
                >
                  <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                  <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                </button>
              </div>

              <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                <div className="lg:pr-4">
                  <ul className="space-y-6 text-base lg:flex lg:gap-8 lg:space-y-0 lg:text-sm">
                    {menuItems.map((item, index) => (
                      <li key={index}>
                        <Link
                          href={item.href}
                          className="text-muted-foreground hover:text-accent-foreground block duration-150"
                        >
                          <span>{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <ModeToggle />

                <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit lg:border-l lg:pl-6">
                  {userId ? (
                    <>
                      <Button asChild>
                        <Link href={"/dashboard"}>Dashboard</Link>
                      </Button>
                      <UserButton />
                    </>
                  ) : (
                    <>
                      <Button asChild variant="outline" size="sm">
                        <Link href="/sign-in">
                          <span>Login</span>
                        </Link>
                      </Button>

                      <Button asChild size="sm">
                        <Link href="/sign-up">
                          <span>Sign up</span>
                        </Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section className="w-full py-20 lg:py-40">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 gap-8 items-center md:grid-cols-2">
              <div className="flex gap-4 flex-col">
                <div>
                  <Badge variant="outline">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">
                      Compartir deseos nunca fue tan fácil
                    </span>
                  </Badge>
                </div>
                <div className="flex gap-4 flex-col">
                  <h1 className="text-5xl md:text-7xl max-w-lg tracking-tighter text-left font-regular">
                    <TextEffect per="char" preset="scale">
                      Tus deseos, compartidos
                    </TextEffect>
                  </h1>
                  <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
                    Crea wishlists hermosas con productos de cualquier tienda
                    online. Comparte con amigos y familia para que siempre
                    regalen lo que realmente quieres.
                  </p>
                </div>
                <div className="flex flex-row gap-4">
                  <Button asChild size="lg" className="gap-4">
                    <Link href={"/sign-up"}>Inicia ahora</Link>
                  </Button>
                </div>

                <div className="flex items-center gap-8 pt-4">
                  <div>
                    <div className="text-3xl font-bold text-foreground">
                      <AnimatedNumber
                        springOptions={{
                          bounce: 0,
                          duration: 2000,
                        }}
                        value={10000}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Wishlists creadas
                    </p>
                  </div>
                  <div className="h-12 w-px bg-border" />
                  <div>
                    <div className="text-3xl font-bold text-foreground">
                      50k+
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Regalos perfectos
                    </div>
                  </div>
                </div>
              </div>

              {/* Right content - Hero image */}
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-glow">
                  <Image
                    src={heroImage}
                    alt="WishShare hero illustration with floating gift boxes"
                    className="w-full h-auto animate-float"
                    height={800}
                    width={800}
                  />
                </div>

                {/* Floating cards decoration */}
                <div className="absolute -top-4 -right-4 bg-card border border-border rounded-2xl p-4 shadow-card animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-accent" />
                    <div>
                      <div className="text-sm font-medium">Amazon</div>
                      <div className="text-xs text-muted-foreground">
                        $49.99
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute -bottom-4 -left-4 bg-card border border-border rounded-2xl p-4 shadow-card animate-float"
                  style={{ animationDelay: "1s" }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-primary" />
                    <div>
                      <div className="text-sm font-medium">eBay</div>
                      <div className="text-xs text-muted-foreground">
                        $29.99
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
