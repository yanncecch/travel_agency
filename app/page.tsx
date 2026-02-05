import Hero from '@/components/home/Hero';
import AgencyPresentation from '@/components/home/AgencyPresentation';
import TrustMetrics from '@/components/home/TrustMetrics';
import DestinationsPreview from '@/components/home/DestinationsPreview';
import ExperienceTimeline from '@/components/home/ExperienceTimeline';
import Testimonials from '@/components/home/Testimonials';
import FaqSection from '@/components/home/FaqSection';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <AgencyPresentation />
      <TrustMetrics />
      <DestinationsPreview />
      <ExperienceTimeline />
      <Testimonials />
      <FaqSection />
    </main>
  );
}
