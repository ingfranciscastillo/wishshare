"use client";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import heroImage from "@/assets/hero-image.jpg";
import { TextEffect } from "../motion-primitives/text-effect";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { AnimatedNumber } from "../motion-primitives/animated-number";
import Navbar from "./navbar";

export default function HeroSection() {
  return (
    <>
      <Navbar />

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
