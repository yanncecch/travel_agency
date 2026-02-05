'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';

const testimonials = [
  {
    author: 'A. Delacroix, collectionneur',
    quote: "Paris 1889 a dépassé tout ce que j'imaginais. L'immersion était d'une précision remarquable.",
    destination: 'Mission Paris 1889'
  },
  {
    author: 'M. Rinaldi, historienne de l’art',
    quote: 'Le parcours Florence 1504 est d\'une finesse rare. Le niveau de médiation culturelle est excellent.',
    destination: 'Mission Florence 1504'
  },
  {
    author: 'J. Morel, entrepreneur',
    quote: 'Le Crétacé est intense, parfaitement sécurisé et spectaculairement orchestré.',
    destination: 'Mission Crétacé -65M'
  }
];

export default function Testimonials() {
  return (
    <section className="mx-auto mt-20 w-full max-w-7xl px-5 md:px-8">
      <ScrollReveal>
        <p className="text-sm uppercase tracking-[0.26em] text-gold-300">Retours voyageurs</p>
        <h2 className="mt-2 font-[var(--font-heading)] text-4xl text-gold-100 md:text-5xl">Ils ont traversé le temps</h2>
      </ScrollReveal>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {testimonials.map((item, index) => (
          <ScrollReveal key={item.author} className="temporal-panel rounded-2xl p-6" delay={index * 0.1}>
            <p className="text-zinc-200">“{item.quote}”</p>
            <p className="mt-4 text-sm font-semibold text-gold-200">{item.author}</p>
            <p className="text-xs uppercase tracking-[0.14em] text-zinc-400">{item.destination}</p>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
