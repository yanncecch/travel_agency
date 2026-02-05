export type Destination = {
  slug: 'paris-1889' | 'florence-1504' | 'cretace-65m';
  title: string;
  epoch: string;
  yearLabel: string;
  image: string;
  shortDescription: string;
  historicalDescription: string;
  experiences: string[];
  advice: string[];
  priceFrom: number;
  duration: string;
};

export const destinations: Destination[] = [
  {
    slug: 'paris-1889',
    title: 'Paris 1889',
    epoch: 'Belle Epoque',
    yearLabel: '1889',
    image:
      'https://images.unsplash.com/photo-1549144511-f099e773c147?auto=format&fit=crop&w=1400&q=80',
    shortDescription:
      "L'inauguration de la Tour Eiffel et l'euphorie de l'Exposition Universelle.",
    historicalDescription:
      "Paris vibre au rythme des innovations, des cabarets et des salons artistiques. Vous découvrez la capitale française au sommet de sa modernité, entre architecture audacieuse et élégance raffinée.",
    experiences: [
      "Accès privé à l'Exposition Universelle avec guide historien",
      'Diner Belle Epoque dans un salon inspiré de Maxim\'s',
      'Observation VIP des premières illuminations de la Tour Eiffel'
    ],
    advice: [
      'Privilégier une tenue élégante d\'époque fournie par l\'agence',
      'Prévoir 6 à 8 heures de marche culturelle par jour',
      'Limiter les interactions anachroniques en espaces publics'
    ],
    priceFrom: 45000,
    duration: '7 jours'
  },
  {
    slug: 'florence-1504',
    title: 'Florence 1504',
    epoch: 'Renaissance',
    yearLabel: '1504',
    image:
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1400&q=80',
    shortDescription:
      "L'âge d'or florentin entre ateliers de maîtres et mécénat des Médicis.",
    historicalDescription:
      "Florence est un laboratoire d'idées où l'art, la science et la politique s'entrelacent. Vous assistez à l'effervescence qui entoure Michel-Ange et découvrez la ville au moment où la Renaissance redéfinit l'Europe.",
    experiences: [
      'Visite scénarisée des ateliers d\'artisans et peintres',
      'Soirée musicale privée dans un palais florentin',
      'Parcours commenté sur les traces de Michel-Ange'
    ],
    advice: [
      'Suivre le briefing linguistique italien avant départ',
      'Éviter de dévoiler des connaissances postérieures au XVIe siècle',
      'Hydratation renforcée durant les visites en extérieur'
    ],
    priceFrom: 52000,
    duration: '5 jours'
  },
  {
    slug: 'cretace-65m',
    title: 'Cretace -65 millions d\'annees',
    epoch: 'Préhistoire',
    yearLabel: '-65 000 000',
    image:
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1400&q=80',
    shortDescription:
      'Une immersion contrôlée au milieu de mégafaune préhistorique spectaculaire.',
    historicalDescription:
      "Depuis un observatoire sécurisé, vous contemplez les écosystèmes du Crétacé supérieur. L'expérience combine science, exploration et sensations rares dans un environnement totalement inhospitalier.",
    experiences: [
      'Safari temporel sous bulle de protection dynamique',
      'Session d\'observation paléontologique avec expert',
      'Nuit en base pressurisée avec vue sur plaine préhistorique'
    ],
    advice: [
      'Destination déconseillée en cas de stress cardiovasculaire',
      'Respect absolu des instructions de confinement',
      'Préparer une acclimatation à forte humidité'
    ],
    priceFrom: 89000,
    duration: '3 jours'
  }
];

export function getDestinationBySlug(slug: string) {
  return destinations.find((destination) => destination.slug === slug);
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(value);
}
