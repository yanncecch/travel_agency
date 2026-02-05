'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';

const metrics = [
  { value: '98.7%', label: 'Satisfaction client', detail: 'Après mission temporelle complète' },
  { value: '0.0004%', label: 'Incidents critiques', detail: 'Sur 12 000 départs contrôlés' },
  { value: '24/7', label: 'Conciergerie experte', detail: 'Coordination avant, pendant et après' },
  { value: '3', label: 'Époques signatures', detail: 'Curatées pour immersion maximale' }
];

export default function TrustMetrics() {
  return (
    <section className="mx-auto mt-16 w-full max-w-7xl px-5 md:px-8">
      <div className="grid gap-4 md:grid-cols-4">
        {metrics.map((metric, index) => (
          <ScrollReveal key={metric.label} className="temporal-panel rounded-2xl p-6" delay={index * 0.08}>
            <p className="text-4xl font-[var(--font-heading)] text-gold-100">{metric.value}</p>
            <p className="mt-2 text-sm uppercase tracking-[0.15em] text-gold-300">{metric.label}</p>
            <p className="mt-2 text-sm text-zinc-300">{metric.detail}</p>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
