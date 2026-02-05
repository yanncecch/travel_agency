'use client';

import { FormEvent, useMemo, useState } from 'react';
import { destinations, formatPrice } from '@/lib/data/destinations';

type FormData = {
  destination: string;
  date: string;
  guests: number;
};

const initialState: FormData = {
  destination: destinations[0].slug,
  date: '',
  guests: 1
};

export default function BookingForm() {
  const [formData, setFormData] = useState<FormData>(initialState);
  const [message, setMessage] = useState('');

  const selectedDestination = useMemo(
    () => destinations.find((item) => item.slug === formData.destination),
    [formData.destination]
  );

  const estimatedTotal = selectedDestination ? selectedDestination.priceFrom * formData.guests : 0;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!formData.date) {
      setMessage('Veuillez sélectionner une date de départ.');
      return;
    }

    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setMessage("La date doit être ultérieure ou égale à aujourd'hui.");
      return;
    }

    setMessage(
      `Demande confirmée: ${formData.guests} voyageur(s) pour ${selectedDestination?.title} le ${selectedDate.toLocaleDateString('fr-FR')}. Budget estimatif ${formatPrice(estimatedTotal)}. Un conseiller vous contacte sous 24h.`
    );
  };

  return (
    <form onSubmit={handleSubmit} className="temporal-panel rounded-3xl p-8">
      <h2 className="font-[var(--font-heading)] text-4xl text-gold-100">Réserver une mission</h2>
      <p className="mt-2 text-zinc-300">Planifiez votre départ temporel avec validation immédiate de la demande.</p>

      <div className="mt-7 space-y-5">
        <label className="block">
          <span className="mb-2 block text-sm uppercase tracking-[0.15em] text-gold-300">Destination</span>
          <select
            className="w-full rounded-xl border border-gold-700/30 bg-black/30 px-4 py-3 text-zinc-100 outline-none transition focus:border-gold-400"
            value={formData.destination}
            onChange={(event) => setFormData((prev) => ({ ...prev, destination: event.target.value }))}
          >
            {destinations.map((destination) => (
              <option key={destination.slug} value={destination.slug}>
                {destination.title}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm uppercase tracking-[0.15em] text-gold-300">Date de départ</span>
          <input
            type="date"
            value={formData.date}
            onChange={(event) => setFormData((prev) => ({ ...prev, date: event.target.value }))}
            className="w-full rounded-xl border border-gold-700/30 bg-black/30 px-4 py-3 text-zinc-100 outline-none transition focus:border-gold-400"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm uppercase tracking-[0.15em] text-gold-300">Voyageurs</span>
          <input
            type="number"
            min={1}
            max={6}
            value={formData.guests}
            onChange={(event) => setFormData((prev) => ({ ...prev, guests: Number(event.target.value) || 1 }))}
            className="w-full rounded-xl border border-gold-700/30 bg-black/30 px-4 py-3 text-zinc-100 outline-none transition focus:border-gold-400"
          />
        </label>
      </div>

      <div className="mt-6 rounded-2xl border border-gold-700/35 bg-black/25 p-4 text-sm text-zinc-200">
        <p className="text-xs uppercase tracking-[0.15em] text-gold-300">Résumé instantané</p>
        <p className="mt-2 font-semibold text-gold-100">{selectedDestination?.title}</p>
        <p className="mt-1">Durée: {selectedDestination?.duration}</p>
        <p>Prix / voyageur: {selectedDestination ? formatPrice(selectedDestination.priceFrom) : '-'}</p>
        <p className="mt-2 text-base font-semibold text-gold-200">Total estimatif: {formatPrice(estimatedTotal)}</p>
        <p className="mt-2 text-xs text-zinc-400">Inclus: préparation, encadrement expert, assurance premium, assistance 24/7.</p>
      </div>

      <button
        type="submit"
        className="mt-7 rounded-full border border-gold-300/70 bg-gold-500/20 px-7 py-3 font-semibold text-gold-100 transition duration-300 hover:bg-gold-500/35"
      >
        Valider ma réservation
      </button>

      {message && (
        <p className="mt-4 rounded-xl border border-gold-600/40 bg-gold-500/10 p-4 text-sm text-zinc-100">{message}</p>
      )}
    </form>
  );
}
