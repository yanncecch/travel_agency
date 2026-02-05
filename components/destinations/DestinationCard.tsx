'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Destination } from '@/lib/data/destinations';
import { formatPrice } from '@/lib/data/destinations';

type DestinationCardProps = {
  destination: Destination;
};

export default function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      whileHover={{ y: -6 }}
      className="group"
    >
      <Link href={`/destinations/${destination.slug}`} className="block overflow-hidden rounded-3xl border border-gold-700/35 bg-zinc-900/55">
        <div className="relative h-80 overflow-hidden">
          <Image
            src={destination.image}
            alt={destination.title}
            fill
            className="object-cover transition duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
          <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100" style={{ background: 'radial-gradient(circle at 50% 70%, rgba(212,165,63,0.28), transparent 55%)' }} />
          <div className="absolute bottom-0 p-6">
            <p className="mb-2 text-sm uppercase tracking-[0.2em] text-gold-300">{destination.epoch}</p>
            <h3 className="font-[var(--font-heading)] text-4xl text-gold-100">{destination.title}</h3>
            <p className="mt-3 text-sm text-zinc-200">{destination.shortDescription}</p>
          </div>
        </div>
        <div className="flex items-center justify-between px-6 py-4">
          <p className="text-gold-200">A partir de {formatPrice(destination.priceFrom)}</p>
          <p className="text-sm text-zinc-300">{destination.duration}</p>
        </div>
      </Link>
    </motion.div>
  );
}
