import { NextRequest, NextResponse } from 'next/server';

const FAQ_RESPONSES = {
  intro:
    "Je suis l'assistant officiel de TimeTravel Agency. Dites-moi ce qui vous attire: art, innovation, sensations fortes ou immersion historique.",
  paris:
    "Paris 1889 est idéal si vous aimez l'élégance, la naissance de la modernité et l'Exposition Universelle. Prix indicatif: 45 000 EUR pour 7 jours.",
  florence:
    "Florence 1504 convient parfaitement aux passionnés d'art et de Renaissance. Prix indicatif: 52 000 EUR pour 5 jours.",
  cretace:
    "Le Crétacé est notre mission la plus spectaculaire, orientée aventure contrôlée et observation de dinosaures. Prix indicatif: 89 000 EUR pour 3 jours.",
  security:
    "Chaque départ suit un protocole de sécurité multi-couche: équipement adapté, guide spécialisé et extraction immédiate en cas d'incident.",
  pricing:
    'Nos formules démarrent à 45 000 EUR et incluent encadrement expert, logistique temporelle et assurance premium.'
};

function suggestDestination(message: string) {
  const lower = message.toLowerCase();

  if (lower.includes('art') || lower.includes('culture') || lower.includes('renaissance')) {
    return "Pour un profil orienté art et culture, je recommande Florence 1504. Vous serez au coeur de la Renaissance avec une immersion intellectuelle exceptionnelle.";
  }

  if (lower.includes('dinosaure') || lower.includes('aventure') || lower.includes('adrénaline')) {
    return "Si vous cherchez l'intensité, choisissez le Crétacé -65M. C'est notre expérience la plus immersive en milieu extrême.";
  }

  if (lower.includes('eiffel') || lower.includes('paris') || lower.includes('elegance')) {
    return "Paris 1889 est parfait pour une expérience raffinée entre innovation, architecture et vie culturelle Belle Epoque.";
  }

  return '';
}

function getResponse(message: string) {
  const lower = message.toLowerCase();

  const recommendation = suggestDestination(message);
  if (recommendation) return recommendation;

  if (lower.includes('paris') || lower.includes('1889') || lower.includes('belle')) return FAQ_RESPONSES.paris;
  if (lower.includes('florence') || lower.includes('1504') || lower.includes('michel') || lower.includes('renaissance'))
    return FAQ_RESPONSES.florence;
  if (lower.includes('cretace') || lower.includes('dino') || lower.includes('t-rex') || lower.includes('65'))
    return FAQ_RESPONSES.cretace;
  if (lower.includes('prix') || lower.includes('tarif') || lower.includes('combien')) return FAQ_RESPONSES.pricing;
  if (lower.includes('securite') || lower.includes('risque') || lower.includes('danger')) return FAQ_RESPONSES.security;

  return FAQ_RESPONSES.intro;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { message?: string };
    if (!body.message || typeof body.message !== 'string') {
      return NextResponse.json({ error: 'Message invalide' }, { status: 400 });
    }

    await new Promise((resolve) => setTimeout(resolve, 650));

    return NextResponse.json({ response: getResponse(body.message) });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
