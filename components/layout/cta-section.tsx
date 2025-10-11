import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            ¿Listo para crear tu primera wishlist?
          </h2>
          <p className="mt-4">
            Únete a miles de usuarios que ya están compartiendo sus deseos de
            forma inteligente
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/sign-up">
                <span>Empezar ahora gratis</span>
              </Link>
            </Button>

            <Button asChild size="lg" variant="outline">
              <Link href="/explore">
                <span>Explorar listas públicas</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
