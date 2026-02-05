import Link from 'next/link';
import Image from 'next/image';
import { Destination, formatPrice } from '@/lib/data/destinations';

type DestinationDetailsProps = {
  destination: Destination;
};

const sampleItinerary = [
  { slot: 'Jour 1', detail: 'Arrivée, briefing sécurité et première immersion guidée.' },
  { slot: 'Jour 2', detail: 'Parcours historique premium et expériences privées.' },
  { slot: 'Jour 3', detail: 'Exploration approfondie + session expert dédiée.' }
];

export default function DestinationDetails({ destination }: DestinationDetailsProps) {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10 md:px-8">
      <div className="relative overflow-hidden rounded-3xl border border-gold-700/40">
        <div className="relative h-[24rem]">
          <Image src={destination.image} alt={destination.title} fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
          <div className="absolute bottom-0 p-8">
            <p className="text-sm uppercase tracking-[0.23em] text-gold-300">{destination.epoch}</p>
            <h1 className="font-[var(--font-heading)] text-5xl text-gold-100 md:text-6xl">{destination.title}</h1>
            <p className="mt-2 text-zinc-200">Période: {destination.yearLabel}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.25fr,0.75fr]">
        <article className="temporal-panel rounded-3xl p-7">
          <h2 className="mb-3 font-[var(--font-heading)] text-3xl text-gold-100">Description historique</h2>
          <p className="text-zinc-200 leading-relaxed">{destination.historicalDescription}</p>

          <h3 className="mb-3 mt-8 text-2xl text-gold-200">Expériences proposées</h3>
          <ul className="space-y-3 text-zinc-200">
            {destination.experiences.map((experience) => (
              <li key={experience} className="rounded-xl border border-gold-700/30 bg-black/30 p-3">
                {experience}
              </li>
            ))}
          </ul>

          <h3 className="mb-3 mt-8 text-2xl text-gold-200">Programme type</h3>
          <ul className="space-y-3 text-zinc-200">
            {sampleItinerary.map((step) => (
              <li key={step.slot} className="rounded-xl border border-gold-700/30 bg-black/20 p-3">
                <p className="font-semibold text-gold-100">{step.slot}</p>
                <p className="text-sm text-zinc-300">{step.detail}</p>
              </li>
            ))}
          </ul>

          <h3 className="mb-3 mt-8 text-2xl text-gold-200">Conseils de voyage temporel</h3>
          <ul className="list-disc space-y-2 pl-6 text-zinc-300">
            {destination.advice.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </article>

        <aside className="temporal-panel h-fit rounded-3xl p-7">
          <h2 className="font-[var(--font-heading)] text-3xl text-gold-100">Informations</h2>
          <div className="mt-6 space-y-5 text-zinc-200">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-gold-300">Prix indicatif</p>
              <p className="text-3xl text-gold-100">{formatPrice(destination.priceFrom)}</p>
              <p className="text-sm text-zinc-400">Par voyageur, formule premium</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-gold-300">Durée</p>
              <p>{destination.duration}</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-gold-300">Inclusions</p>
              <p className="text-sm text-zinc-300">Guide expert, sécurité renforcée, tenue adaptée, assistance 24/7.</p>
            </div>
          </div>
          <Link
            href="/booking"
            className="mt-8 inline-flex rounded-full border border-gold-300/70 bg-gold-500/20 px-6 py-3 font-semibold text-gold-100 transition duration-300 hover:bg-gold-500/30"
          >
            Réserver cette mission
          </Link>
        </aside>
      </div>
    </div>
  );
}
