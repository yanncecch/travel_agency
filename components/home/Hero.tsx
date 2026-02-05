'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const title = 'TimeTravel Agency';

export default function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-73px)] items-center justify-center overflow-hidden px-5 md:px-8">
      <div className="orb absolute -left-24 top-24 h-80 w-80 rounded-full bg-gold-500/20 blur-3xl" />
      <div className="orb absolute -right-16 bottom-16 h-[26rem] w-[26rem] rounded-full bg-indigo-400/20 blur-3xl" />
      <motion.div
        className="absolute inset-0 opacity-60"
        animate={{ rotate: 360 }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
      >
        <div className="mx-auto mt-20 h-[26rem] w-[26rem] rounded-full border border-gold-300/25 bg-[radial-gradient(circle,rgba(212,165,63,0.24)_0%,rgba(0,0,0,0)_65%)]" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <p className="mb-5 text-sm uppercase tracking-[0.35em] text-gold-300">Agence de voyage temporel de luxe</p>
        <motion.h1
          className="mb-6 text-5xl font-[var(--font-heading)] leading-none text-gold-100 sm:text-6xl lg:text-8xl"
          initial="hidden"
          animate="visible"
        >
          {title.split('').map((letter, index) => (
            <motion.span
              key={`${letter}-${index}`}
              className="inline-block"
              variants={{
                hidden: { opacity: 0, y: 26 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.65, delay: index * 0.045, ease: 'easeOut' }
                }
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </motion.h1>
        <motion.p
          className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-zinc-200 md:text-xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2, ease: 'easeOut' }}
        >
          Traversez les siècles avec un niveau de confort inégalé, des itinéraires privés et une sécurité temporelle certifiée.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 1.45, ease: 'easeInOut' }}
        >
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 rounded-full border border-gold-300/70 bg-gold-500/20 px-8 py-4 text-base font-semibold text-gold-100 transition duration-300 hover:scale-[1.02] hover:bg-gold-500/30 hover:shadow-aura"
          >
            Découvrir les destinations
            <span aria-hidden>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
