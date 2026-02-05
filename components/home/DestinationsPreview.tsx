import DestinationCard from '@/components/destinations/DestinationCard';
import { destinations } from '@/lib/data/destinations';

export default function DestinationsPreview() {
  return (
    <section className="mx-auto mt-16 w-full max-w-7xl px-5 md:px-8">
      <div className="mb-7 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.26em] text-gold-300">Selection exclusive</p>
          <h2 className="font-[var(--font-heading)] text-4xl text-gold-100 md:text-5xl">Destinations iconiques</h2>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {destinations.map((destination) => (
          <DestinationCard key={destination.slug} destination={destination} />
        ))}
      </div>
    </section>
  );
}
