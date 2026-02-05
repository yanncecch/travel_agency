import DestinationCard from '@/components/destinations/DestinationCard';
import { destinations, formatPrice } from '@/lib/data/destinations';

const difficultyMap = {
  'paris-1889': 'Faible',
  'florence-1504': 'Modéré',
  'cretace-65m': 'Elevé'
} as const;

export default function DestinationsPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-10 md:px-8">
      <section>
        <p className="text-sm uppercase tracking-[0.3em] text-gold-300">Catalogue premium</p>
        <h1 className="mt-2 font-[var(--font-heading)] text-5xl text-gold-100 md:text-6xl">Choisissez votre époque</h1>
        <p className="mt-4 max-w-2xl text-zinc-200">
          Trois destinations signatures, pensées pour des voyageurs exigeants qui cherchent une immersion historique d&apos;exception.
        </p>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-3">
        {destinations.map((destination) => (
          <DestinationCard key={destination.slug} destination={destination} />
        ))}
      </section>

      <section className="temporal-panel mt-12 overflow-hidden rounded-3xl">
        <div className="border-b border-gold-700/30 px-6 py-5">
          <h2 className="font-[var(--font-heading)] text-4xl text-gold-100">Comparateur express</h2>
          <p className="mt-2 text-zinc-300">Comparez rapidement budget, durée et niveau d&apos;intensité.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-black/35 text-sm uppercase tracking-[0.14em] text-gold-300">
              <tr>
                <th className="px-6 py-4">Destination</th>
                <th className="px-6 py-4">Durée</th>
                <th className="px-6 py-4">Prix indicatif</th>
                <th className="px-6 py-4">Intensité</th>
              </tr>
            </thead>
            <tbody>
              {destinations.map((destination) => (
                <tr key={destination.slug} className="border-t border-gold-700/20 text-zinc-200">
                  <td className="px-6 py-4 font-semibold text-gold-100">{destination.title}</td>
                  <td className="px-6 py-4">{destination.duration}</td>
                  <td className="px-6 py-4">{formatPrice(destination.priceFrom)}</td>
                  <td className="px-6 py-4">{difficultyMap[destination.slug]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
