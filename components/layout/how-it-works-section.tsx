import { CheckCircle2 } from "lucide-react";
import React from "react";

const steps = [
  {
    step: "01",
    title: "Crea tu wishlist",
    description:
      "Dale un nombre, descripción y elige si será pública o privada.",
  },
  {
    step: "02",
    title: "Añade tus deseos",
    description:
      "Pega links de productos o busca directamente en nuestro catálogo.",
  },
  {
    step: "03",
    title: "Comparte y disfruta",
    description:
      "Envía el link a tus amigos y familia. Ellos verán tu wishlist actualizada.",
  },
];

const howItWorks = () => {
  return (
    <section id="how-it-works" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Tres pasos simples
          </h2>
          <p className="text-lg text-muted-foreground">
            Crea y comparte tu wishlist en minutos
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {steps.map((item, index) => (
            <div
              key={index}
              className="flex gap-6 items-start animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-2xl font-bold text-white shadow-glow">
                {item.step}
              </div>
              <div className="flex-1 pt-2">
                <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-lg">
                  {item.description}
                </p>
              </div>
              <div className="hidden md:block flex-shrink-0">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default howItWorks;
