'use client';

import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';

const phases = [
  {
    title: '01. Briefing Chronologique',
    description: 'Analyse de profil, choix de période, calibration de sécurité et préparation culturelle.'
  },
  {
    title: '02. Transition Temporelle',
    description: 'Passage par portail stabilisé et arrivée encadrée par votre guide d\'époque.'
  },
  {
    title: '03. Immersion Premium',
    description: 'Expériences privées, observations exclusives et assistance en continu.'
  },
  {
    title: '04. Retour et Debrief',
    description: 'Décompression physiologique, archivage souvenirs et rapport personnalisé.'
  }
];

export default function ExperienceTimeline() {
  return (
    <section className="mx-auto mt-20 w-full max-w-7xl px-5 md:px-8">
      <ScrollReveal>
        <p className="text-sm uppercase tracking-[0.26em] text-gold-300">Processus mission</p>
        <h2 className="mt-2 font-[var(--font-heading)] text-4xl text-gold-100 md:text-5xl">Comment se déroule un voyage temporel</h2>
      </ScrollReveal>

      <div className="mt-8 space-y-4">
        {phases.map((phase, index) => (
          <motion.article
            key={phase.title}
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: index * 0.08, ease: 'easeOut' }}
            className="temporal-panel relative rounded-2xl p-6 md:p-7"
          >
            <div className="absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-gradient-to-b from-gold-300 to-gold-700" />
            <h3 className="text-2xl font-semibold text-gold-100">{phase.title}</h3>
            <p className="mt-2 text-zinc-300">{phase.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
