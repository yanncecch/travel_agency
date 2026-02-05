'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';

const values = [
  {
    title: 'Securite Absolue',
    description: 'Protocoles quantiques, extraction d\'urgence instantanée et guides certifiés en paradoxes historiques.'
  },
  {
    title: 'Immersion Historique',
    description: 'Scénographies sur mesure, contextualisation culturelle et intégration discrète à chaque époque.'
  },
  {
    title: 'Experience Unique',
    description: 'Parcours exclusifs, petits groupes et accompagnement premium pour chaque voyageur.'
  }
];

export default function AgencyPresentation() {
  return (
    <section className="mx-auto mt-10 w-full max-w-7xl px-5 md:px-8">
      <ScrollReveal className="temporal-panel rounded-3xl p-8 md:p-12">
        <h2 className="mb-5 font-[var(--font-heading)] text-4xl text-gold-100 md:text-5xl">Luxe, histoire et innovation</h2>
        <p className="max-w-4xl text-base leading-relaxed text-zinc-200 md:text-lg">
          TimeTravel Agency conçoit des voyages temporels haut de gamme pour une clientèle exigeante. Notre promesse: conjuguer le frisson de la découverte historique avec les standards les plus élevés en matière de confort et de maîtrise des risques.
        </p>
      </ScrollReveal>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {values.map((value, index) => (
          <ScrollReveal key={value.title} className="temporal-panel rounded-2xl p-6" delay={index * 0.1}>
            <h3 className="mb-2 text-xl font-semibold text-gold-200">{value.title}</h3>
            <p className="text-sm leading-relaxed text-zinc-300">{value.description}</p>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
