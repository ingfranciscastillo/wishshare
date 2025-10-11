"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default function FAQsTwo() {
  const faqItems = [
    {
      id: "item-1",
      question: "¿Qué es una wishlist compartida?",
      answer:
        "Una wishlist es una lista de deseos que puedes crear para organizar los productos o regalos que te gustaría tener. Al compartirla, tus amigos o familiares pueden verla, comentar o ayudarte a conseguir esos artículos.",
    },
    {
      id: "item-2",
      question: "¿Necesito una cuenta para crear una wishlist?",
      answer:
        "Sí, necesitas una cuenta para guardar y gestionar tus wishlists. Esto te permite acceder a ellas desde cualquier dispositivo y mantenerlas privadas o compartidas según prefieras.",
    },
    {
      id: "item-3",
      question: "¿Puedo hacer que mi wishlist sea privada?",
      answer:
        "Claro. Puedes elegir si una lista es pública (visible para todos), compartida solo por enlace, o completamente privada. Tú decides quién puede verla.",
    },
    {
      id: "item-4",
      question: "¿Cómo comparto mi wishlist con otras personas?",
      answer:
        "Puedes copiar el enlace de tu lista y enviarlo por mensaje, correo o redes sociales. Si la lista es pública o compartida por enlace, cualquiera con el link podrá verla.",
    },
    {
      id: "item-5",
      question: "¿Puedo agregar cualquier tipo de producto?",
      answer:
        "Sí. Puedes añadir productos desde cualquier tienda online o escribir tus propias ideas o notas. También puedes subir imágenes o enlaces personalizados.",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
            Preguntas frecuentes
          </h2>
          <p className="text-muted-foreground mt-4 text-balance">
            Encuentra respuestas rápidas a las dudas más comunes sobre cómo
            crear, compartir y personalizar tus wishlists.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-xl">
          <Accordion
            type="single"
            collapsible
            className="bg-card ring-muted w-full rounded-2xl border px-8 py-3 shadow-sm ring-4 dark:ring-0"
          >
            {faqItems.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border-dashed"
              >
                <AccordionTrigger className="cursor-pointer text-base hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-base">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
