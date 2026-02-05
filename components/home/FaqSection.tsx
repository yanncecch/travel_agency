'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';

const faqItems = [
  {
    question: 'Le voyage temporel est-il réellement sûr ?',
    answer:
      "Oui. Chaque mission est encadrée par un protocole multi-couche: préparation médicale, équipement certifié, supervision continue et extraction immédiate en cas d'alerte."
  },
  {
    question: 'Puis-je modifier ma destination après réservation ?',
    answer:
      'Oui, sous réserve de disponibilité des fenêtres temporelles. Une replanification premium est proposée jusqu\'à 10 jours avant départ.'
  },
  {
    question: 'Quel voyage choisir pour une première expérience ?',
    answer:
      'Paris 1889 est le plus doux pour débuter. Florence 1504 est idéal pour un profil culturel. Le Crétacé est recommandé aux voyageurs en quête d\'intensité.'
  },
  {
    question: 'Les prix incluent-ils tout ?',
    answer:
      'Les tarifs incluent logistique temporelle, accompagnement expert, sécurité premium, tenue adaptée et assistance conciergerie.'
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className="mx-auto mt-20 w-full max-w-4xl px-5 md:px-8">
      <ScrollReveal>
        <p className="text-center text-sm uppercase tracking-[0.26em] text-gold-300">FAQ</p>
        <h2 className="mt-2 text-center font-[var(--font-heading)] text-4xl text-gold-100 md:text-5xl">Questions fréquentes</h2>
      </ScrollReveal>

      <div className="mt-8 space-y-3">
        {faqItems.map((item, index) => {
          const open = openIndex === index;

          return (
            <ScrollReveal key={item.question}>
              <article className="temporal-panel rounded-2xl px-5 py-4">
                <button
                  onClick={() => setOpenIndex(open ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 text-left"
                >
                  <span className="font-semibold text-gold-100">{item.question}</span>
                  <span className="text-xl text-gold-300">{open ? '−' : '+'}</span>
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.p
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 10 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.7, ease: 'easeInOut' }}
                      className="overflow-hidden text-sm leading-relaxed text-zinc-300"
                    >
                      {item.answer}
                    </motion.p>
                  )}
                </AnimatePresence>
              </article>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
