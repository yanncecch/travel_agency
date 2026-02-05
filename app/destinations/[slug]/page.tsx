import { notFound } from 'next/navigation';
import DestinationDetails from '@/components/destinations/DestinationDetails';
import { destinations, getDestinationBySlug } from '@/lib/data/destinations';

type DestinationDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return destinations.map((destination) => ({ slug: destination.slug }));
}

export default async function DestinationDetailPage({ params }: DestinationDetailPageProps) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);

  if (!destination) {
    notFound();
  }

  return (
    <main>
      <DestinationDetails destination={destination} />
    </main>
  );
}
