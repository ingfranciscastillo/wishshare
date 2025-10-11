import { Share2, Sparkles, Heart, Palette } from "lucide-react";
import Image from "next/image";
import { TextEffect } from "../motion-primitives/text-effect";

export default function FeaturesSection() {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-12 lg:grid-cols-5 lg:gap-24">
          <div className="lg:col-span-2">
            <div className="md:pr-6 lg:pr-0">
              <h2 className="text-4xl font-semibold lg:text-5xl">
                <TextEffect per="char" preset="scale">
                  Hecha para compartir tus deseos
                </TextEffect>
              </h2>
              <p className="mt-6">
                Organiza tus ideas, crea listas únicas y compártelas fácilmente
                con tus amigos o familia. Ideal para cumpleaños, fiestas o
                simplemente guardar lo que más te gusta.
              </p>
            </div>
            <ul className="mt-8 divide-y border-y *:flex *:items-center *:gap-3 *:py-3">
              <li>
                <Sparkles className="size-5 text-accent" />
                Rápida, intuitiva y lista para usar en segundos
              </li>
              <li>
                <Heart className="size-5 text-accent" />
                Sigue las listas más populares e inspírate
              </li>
              <li>
                <Palette className="size-5 text-accent" />
                Personaliza tus wishlists con estilo y categorías
              </li>
              <li>
                <Share2 className="size-5 text-accent" />
                Comparte tus listas por enlace o correo electrónico
              </li>
            </ul>
          </div>
          <div className="border-border/50 relative rounded-3xl border p-3 lg:col-span-3">
            <div className="bg-linear-to-b aspect-76/59 relative rounded-2xl from-zinc-300 to-transparent p-px dark:from-zinc-700">
              <Image
                src="/payments.png"
                className="hidden rounded-[15px] dark:block"
                alt="payments illustration dark"
                width={1207}
                height={929}
              />
              <Image
                src="/payments-light.png"
                className="rounded-[15px] shadow dark:hidden"
                alt="payments illustration light"
                width={1207}
                height={929}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
