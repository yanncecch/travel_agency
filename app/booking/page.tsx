import BookingForm from '@/components/booking/BookingForm';

export default function BookingPage() {
  return (
    <main className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-10 md:grid-cols-[1fr,1fr] md:px-8">
      <section className="temporal-panel rounded-3xl p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-gold-300">Conciergerie temporelle</p>
        <h1 className="mt-2 font-[var(--font-heading)] text-5xl text-gold-100">Préparer votre départ</h1>
        <p className="mt-4 text-zinc-200 leading-relaxed">
          Nos équipes valident chaque mission selon votre profil voyageur, vos objectifs culturels et le niveau d&apos;intensité recherché.
        </p>
        <ul className="mt-6 list-disc space-y-2 pl-5 text-zinc-300">
          <li>Briefing sécurité et adaptation comportementale inclus</li>
          <li>Assurance paradoxes historiques premium</li>
          <li>Accompagnement personnalisé par un guide expert</li>
        </ul>
      </section>
      <section>
        <BookingForm />
      </section>
    </main>
  );
}
