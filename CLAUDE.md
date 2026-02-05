# TimeTravel Agency - Guide de développement

## Vue d'ensemble du projet

Site web immersif pour une agence fictive de voyage temporel de luxe, combinant React/Next.js, animations premium (Framer Motion) et chatbot IA intégré.

---

## Stack technique

- **Framework** : Next.js 14+ (App Router)
- **UI** : React 18+
- **Styling** : Tailwind CSS
- **Animations** : Framer Motion
- **Chatbot** : API Claude (Anthropic) via route API Next.js
- **Images** : Next/Image avec optimisation
- **Déploiement** : Vercel (recommandé)

---

## Architecture du projet

```
timetravel-agency/
├── app/
│   ├── layout.tsx                    # Layout principal
│   ├── page.tsx                      # Page d'accueil (Hero + sections)
│   ├── destinations/
│   │   ├── page.tsx                  # Galerie des destinations
│   │   └── [slug]/
│   │       └── page.tsx              # Détails d'une destination
│   ├── booking/
│   │   └── page.tsx                  # Formulaire de réservation
│   └── api/
│       └── chat/
│           └── route.ts              # API route pour le chatbot
├── components/
│   ├── layout/
│   │   ├── Header.tsx                # Navigation
│   │   └── Footer.tsx                # Pied de page
│   ├── home/
│   │   ├── Hero.tsx                  # Section hero
│   │   ├── AgencyPresentation.tsx    # Présentation agence
│   │   └── DestinationsPreview.tsx   # Aperçu destinations
│   ├── destinations/
│   │   ├── DestinationCard.tsx       # Card interactive
│   │   ├── DestinationGallery.tsx    # Grille de cards
│   │   └── DestinationDetails.tsx    # Page détaillée
│   ├── booking/
│   │   └── BookingForm.tsx           # Formulaire réservation
│   ├── chatbot/
│   │   ├── ChatWidget.tsx            # Widget flottant
│   │   ├── ChatWindow.tsx            # Fenêtre de chat
│   │   ├── ChatMessage.tsx           # Message individuel
│   │   └── ChatInput.tsx             # Input utilisateur
│   └── ui/
│       ├── Button.tsx                # Bouton réutilisable
│       ├── Card.tsx                  # Card réutilisable
│       └── ScrollReveal.tsx          # Wrapper animation scroll
├── lib/
│   ├── data/
│   │   └── destinations.ts           # Data des destinations
│   ├── animations/
│   │   └── variants.ts               # Variants Framer Motion
│   └── utils/
│       └── chatbot-prompts.ts        # Prompts système chatbot
├── public/
│   ├── videos/
│   │   └── time-portal.mp4           # Vidéo hero
│   └── images/
│       └── destinations/
│           ├── paris-1889.jpg
│           ├── florence-1504.jpg
│           └── cretace.jpg
└── styles/
    └── globals.css                   # Styles globaux + Tailwind
```

---

## 1. Hero Section (Page d'accueil)

### Spécifications

- **Hauteur** : 100vh (plein écran)
- **Fond** : Vidéo en loop avec overlay gradient noir semi-transparent
- **Animation titre** : Apparition lettre par lettre avec stagger
- **Sous-titre** : Fade-in avec délai
- **CTA** : Bouton avec hover effect (glow doré)

### Code Hero.tsx

```typescript
'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const router = useRouter();
  const title = "Voyagez à travers le temps";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Variants pour l'animation lettre par lettre
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.05,
        ease: 'easeOut'
      }
    })
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Vidéo de fond */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      >
        <source src="/videos/time-portal.mp4" type="video/mp4" />
      </video>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />

      {/* Contenu principal */}
      <div className="relative z-10 text-center px-4 max-w-5xl">
        {/* Titre animé lettre par lettre */}
        <motion.h1 
          className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 leading-tight"
          initial="hidden"
          animate="visible"
        >
          {mounted && title.split('').map((char, index) => (
            <motion.span
              key={index}
              custom={index}
              variants={letterVariants}
              className="inline-block"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Sous-titre */}
        <motion.p
          className="text-xl md:text-2xl text-gray-300 mb-12 font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.5, ease: 'easeOut' }}
        >
          L'histoire n'attend que vous
        </motion.p>

        {/* CTA Button */}
        <motion.button
          onClick={() => router.push('/destinations')}
          className="group relative px-8 py-4 bg-gradient-to-r from-amber-600 to-yellow-500 text-black font-semibold rounded-full overflow-hidden"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 2, ease: 'easeOut' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10">Découvrir les destinations</span>
          {/* Glow effect au hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl bg-amber-400" />
        </motion.button>
      </div>

      {/* Indicateur de scroll (optionnel) */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ 
          opacity: { delay: 2.5, duration: 0.5 },
          y: { repeat: Infinity, duration: 2, ease: 'easeInOut' }
        }}
      >
        <div className="w-6 h-10 border-2 border-amber-500/50 rounded-full p-1">
          <div className="w-1.5 h-2 bg-amber-500 rounded-full mx-auto" />
        </div>
      </motion.div>
    </section>
  );
}
```

---

## 2. Présentation de l'agence

### Spécifications

- **Animation** : Fade-in au scroll avec useInView de Framer Motion
- **Layout** : Texte centré + 3 cards de valeurs
- **Style** : Fond noir, texte clair, accents dorés

### Code AgencyPresentation.tsx

```typescript
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const values = [
  {
    icon: '🛡️',
    title: 'Sécurité',
    description: 'Protocoles quantiques certifiés ISO-Temporal 9001'
  },
  {
    icon: '🎭',
    title: 'Immersion',
    description: 'Costumes d\'époque et formation linguistique incluse'
  },
  {
    icon: '⭐',
    title: 'Excellence',
    description: 'Expériences sur-mesure avec guides temporels experts'
  }
];

export default function AgencyPresentation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Titre */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h2 className="text-4xl md:text-5xl font-serif text-amber-500 mb-6">
            TimeTravel Agency
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Pionniers du voyage temporel de luxe depuis 2184, nous vous offrons 
            une expérience unique alliant <span className="text-amber-400 font-semibold">sécurité absolue</span>, 
            <span className="text-amber-400 font-semibold"> immersion historique totale</span> et 
            accompagnement personnalisé par nos guides temporels certifiés.
          </p>
        </motion.div>

        {/* Grille de valeurs */}
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              className="group relative p-8 bg-gradient-to-b from-gray-900/80 to-black border border-amber-900/30 rounded-lg hover:border-amber-500/50 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: 0.2 + index * 0.15,
                ease: 'easeOut' 
              }}
            >
              {/* Glow effect au hover */}
              <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-2xl font-semibold text-amber-400 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## 3. Data des destinations

### lib/data/destinations.ts

```typescript
export interface Destination {
  slug: string;
  title: string;
  epoch: string;
  year: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  imageAlt: string;
  highlights: string[];
  price: number;
  currency: string;
  duration: string;
  maxTravelers: number;
  experiences: Experience[];
  travelAdvice: string[];
  safetyRating: number;
  difficulty: 'Facile' | 'Modéré' | 'Difficile';
}

export interface Experience {
  title: string;
  description: string;
  duration: string;
}

export const destinations: Destination[] = [
  {
    slug: 'paris-1889',
    title: 'Paris 1889',
    epoch: 'Belle Époque',
    year: '1889',
    tagline: 'L\'apogée de l\'élégance française',
    shortDescription: 'Revivez l\'inauguration de la Tour Eiffel et l\'effervescence de l\'Exposition Universelle.',
    fullDescription: 'Plongez au cœur de la Belle Époque parisienne lors de l\'année la plus éblouissante du XIXe siècle. Assistez à l\'inauguration de la Tour Eiffel, chef-d\'œuvre controversé de Gustave Eiffel, déambulez dans les allées de l\'Exposition Universelle qui attire des millions de visiteurs du monde entier, et laissez-vous enivrer par l\'effervescence culturelle d\'une ville en pleine révolution artistique.',
    image: '/images/destinations/paris-1889.jpg',
    imageAlt: 'Tour Eiffel et Exposition Universelle de Paris en 1889',
    highlights: [
      'Inauguration officielle de la Tour Eiffel',
      'Visite privée de l\'Exposition Universelle',
      'Soirée au Moulin Rouge authentique',
      'Rencontre avec Gustave Eiffel (sous réserve)',
      'Déjeuner chez Maxim\'s dans sa version originale'
    ],
    price: 45000,
    currency: '€',
    duration: '7 jours / 6 nuits',
    maxTravelers: 8,
    experiences: [
      {
        title: 'Visite guidée de l\'Exposition Universelle',
        description: 'Découvrez les pavillons des cinq continents, la Galerie des Machines et les dernières innovations technologiques de l\'époque.',
        duration: 'Journée complète'
      },
      {
        title: 'Ascension de la Tour Eiffel',
        description: 'Montez au sommet de la Tour Eiffel fraîchement inaugurée et admirez Paris depuis ses 300 mètres de hauteur.',
        duration: '3 heures'
      },
      {
        title: 'Soirée cabaret au Moulin Rouge',
        description: 'Assistez à l\'un des premiers spectacles du célèbre cabaret et découvrez le French Cancan dans son contexte original.',
        duration: 'Soirée complète'
      },
      {
        title: 'Déjeuner gastronomique',
        description: 'Savourez un repas Belle Époque chez Maxim\'s, temple de la gastronomie parisienne.',
        duration: '2 heures'
      },
      {
        title: 'Balade en calèche sur les Champs-Élysées',
        description: 'Parcourez la plus belle avenue du monde en calèche d\'époque.',
        duration: '1 heure'
      }
    ],
    travelAdvice: [
      'Port du corset obligatoire pour les dames (fourni)',
      'Tenue masculine : costume trois-pièces et haut-de-forme (fournis)',
      'Vaccination anti-typhoïde et anti-tuberculose requise',
      'Monnaie locale : Francs-or français fournis (50 francs/jour)',
      'Guide temporel francophone et historien inclus',
      'Appareil photo période autorisé (location sur place)',
      'Apprentissage du français Belle Époque recommandé (formation incluse)'
    ],
    safetyRating: 4.8,
    difficulty: 'Facile'
  },
  {
    slug: 'florence-1504',
    title: 'Florence 1504',
    epoch: 'Renaissance',
    year: '1504',
    tagline: 'Au cœur de la Renaissance italienne',
    shortDescription: 'Côtoyez Michel-Ange, Léonard de Vinci et les Médicis dans la Florence des génies.',
    fullDescription: 'Voyagez au sommet de la Renaissance italienne, à l\'époque où Florence rayonne comme centre artistique et intellectuel de l\'Europe. Observez Michel-Ange achevant sa sculpture du David, dialoguez avec Léonard de Vinci dans son atelier, et participez aux fastueux banquets de la famille Médicis. Une immersion totale dans l\'âge d\'or de l\'art et de la pensée humaniste.',
    image: '/images/destinations/florence-1504.jpg',
    imageAlt: 'Florence Renaissance avec le Duomo et les ateliers d\'artistes',
    highlights: [
      'Visite de l\'atelier de Michel-Ange',
      'Rencontre avec Léonard de Vinci',
      'Banquet au Palazzo Medici',
      'Assister à l\'installation du David sur la Piazza della Signoria',
      'Cours de peinture avec un maître Renaissance'
    ],
    price: 52000,
    currency: '€',
    duration: '5 jours / 4 nuits',
    maxTravelers: 6,
    experiences: [
      {
        title: 'Atelier de Michel-Ange',
        description: 'Observez le maître sculptant le marbre et échangez sur sa vision artistique (traduction simultanée).',
        duration: 'Demi-journée'
      },
      {
        title: 'Dialogue avec Léonard de Vinci',
        description: 'Rencontre privée dans l\'atelier du génie polymathe pour discuter art, science et inventions.',
        duration: '2 heures'
      },
      {
        title: 'Banquet des Médicis',
        description: 'Participez à un festin Renaissance au Palazzo Medici en présence de la noblesse florentine.',
        duration: 'Soirée complète'
      },
      {
        title: 'Cours de peinture Renaissance',
        description: 'Initiez-vous aux techniques de la fresque et de la tempera avec un maître artisan.',
        duration: '4 heures'
      },
      {
        title: 'Visite des ateliers d\'orfèvrerie',
        description: 'Découvrez les secrets des artisans du Ponte Vecchio.',
        duration: '3 heures'
      }
    ],
    travelAdvice: [
      'Tenue Renaissance fournie sur-mesure (doublet, pourpoint, robe à la florentine)',
      'Notions d\'italien de base recommandées (formation linguistique incluse)',
      'Traducteur personnel affecté à chaque voyageur',
      'Interdit : photographie, objets anachroniques visibles',
      'Respect strict du protocole nobiliaire enseigné avant le départ',
      'Monnaie : Florins d\'or fournis',
      'Vaccination hépatite A et typhoïde obligatoires'
    ],
    safetyRating: 4.6,
    difficulty: 'Modéré'
  },
  {
    slug: 'cretace',
    title: 'Crétacé -65 millions d\'années',
    epoch: 'Préhistoire',
    year: '-65 000 000',
    tagline: 'Quand les géants régnaient sur Terre',
    shortDescription: 'Explorez un monde primordial peuplé de dinosaures dans un safari temporal sécurisé.',
    fullDescription: 'Remontez 65 millions d\'années en arrière pour découvrir la Terre à l\'époque du Crétacé supérieur, quelques semaines avant l\'extinction des dinosaures. Observez en toute sécurité depuis notre observatoire temporal blindé des troupeaux de Tricératops, admirez la majesté du Tyrannosaure Rex, et émerveillez-vous devant des paysages vierges de toute présence humaine. Une aventure préhistorique inoubliable dans un écosystème intact.',
    image: '/images/destinations/cretace.jpg',
    imageAlt: 'Paysage du Crétacé avec Tyrannosaure Rex et végétation luxuriante',
    highlights: [
      'Observation d\'un T-Rex en chasse',
      'Troupeau de Tricératops (50+ individus)',
      'Éclosion de bébés Vélociraptor',
      'Vol de Ptéranodon au coucher du soleil',
      'Forêt préhistorique de fougères géantes'
    ],
    price: 89000,
    currency: '€',
    duration: '3 jours / 2 nuits',
    maxTravelers: 4,
    experiences: [
      {
        title: 'Safari temporal en véhicule blindé',
        description: 'Parcourez les plaines crétacées dans un véhicule de haute technologie invisible aux dinosaures.',
        duration: 'Journée complète'
      },
      {
        title: 'Observation nocturne de ptérosaures',
        description: 'Assistez au spectacle des Ptéranodons chassant au clair de lune.',
        duration: '4 heures'
      },
      {
        title: 'Exploration botanique guidée',
        description: 'Découvrez la flore du Crétacé avec un paléobotaniste expert.',
        duration: 'Demi-journée'
      },
      {
        title: 'Simulation de chasse préhistorique',
        description: 'Expérience en réalité virtuelle de chasse au Pachycéphalosaure (aucun animal réel n\'est blessé).',
        duration: '2 heures'
      }
    ],
    travelAdvice: [
      'Aucun contact physique avec la faune autorisé',
      'Équipement de protection individuel haute technologie fourni',
      'Vaccination anti-parasites préhistoriques obligatoire (protocole spécial)',
      'Déconseillé aux personnes cardiaques ou claustrophobes',
      'Observatoire blindé certifié résistant aux charges de T-Rex',
      'Champ de force temporel actif en permanence',
      'Combinaison thermorégulatrice fournie (climat tropical humide)',
      'Interdiction formelle de sortir de la zone protégée'
    ],
    safetyRating: 4.9,
    difficulty: 'Difficile'
  }
];

// Fonction utilitaire pour récupérer une destination par slug
export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find(dest => dest.slug === slug);
}

// Fonction pour formater le prix
export function formatPrice(price: number, currency: string = '€'): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency === '€' ? 'EUR' : 'USD',
    minimumFractionDigits: 0
  }).format(price);
}
```

---

## 4. Destination Card (avec hover effects)

### components/destinations/DestinationCard.tsx

```typescript
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Destination } from '@/lib/data/destinations';

interface DestinationCardProps {
  destination: Destination;
  index: number;
}

export default function DestinationCard({ destination, index }: DestinationCardProps) {
  return (
    <Link href={`/destinations/${destination.slug}`}>
      <motion.div
        className="group relative h-[500px] rounded-xl overflow-hidden cursor-pointer"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ 
          duration: 0.6, 
          delay: index * 0.15,
          ease: 'easeOut' 
        }}
        whileHover={{ y: -8 }}
      >
        {/* Image */}
        <div className="relative w-full h-full">
          <Image
            src={destination.image}
            alt={destination.imageAlt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
          
          {/* Glow doré au hover */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'radial-gradient(circle at center, rgba(251, 191, 36, 0.15) 0%, transparent 70%)'
            }}
          />
        </div>

        {/* Contenu */}
        <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
          {/* Badge époque */}
          <motion.div
            className="inline-block px-4 py-1 bg-amber-500/20 border border-amber-500/50 rounded-full text-amber-300 text-sm font-medium mb-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.15 }}
          >
            {destination.epoch}
          </motion.div>

          {/* Titre */}
          <h3 className="text-3xl md:text-4xl font-serif text-white mb-2 group-hover:text-amber-400 transition-colors duration-300">
            {destination.title}
          </h3>

          {/* Tagline */}
          <p className="text-gray-300 text-lg mb-4">
            {destination.tagline}
          </p>

          {/* Description courte */}
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {destination.shortDescription}
          </p>

          {/* Prix et durée */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
            <div>
              <span className="text-2xl font-bold text-amber-400">
                {destination.price.toLocaleString('fr-FR')} {destination.currency}
              </span>
              <span className="text-gray-400 text-sm ml-2">/ personne</span>
            </div>
            <div className="text-gray-400 text-sm">
              {destination.duration}
            </div>
          </div>

          {/* Flèche "En savoir plus" */}
          <motion.div
            className="absolute bottom-8 right-8 w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            whileHover={{ scale: 1.1 }}
          >
            <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
}
```

---

## 5. Chatbot IA

### 5.1 API Route : app/api/chat/route.ts

```typescript
import { NextRequest, NextResponse } from 'next/server';

// Simulation de réponses (à remplacer par l'API Claude en production)
const simulatedResponses: Record<string, string> = {
  default: "Bonjour ! Je suis votre assistant voyage temporel. Comment puis-je vous aider aujourd'hui ? 🕰️",
  
  paris: "Paris 1889 est une destination extraordinaire ! Vous vivrez l'inauguration de la Tour Eiffel et l'effervescence de l'Exposition Universelle. Le tarif est de 45 000€ pour 7 jours avec un accompagnement complet. Souhaitez-vous plus d'informations sur les expériences incluses ?",
  
  florence: "Florence 1504 vous plonge au cœur de la Renaissance ! Vous rencontrerez Michel-Ange et Léonard de Vinci. Cette expérience culturelle unique coûte 52 000€ pour 5 jours. Êtes-vous passionné d'art et d'histoire ?",
  
  dinosaure: "Le Crétacé est notre destination la plus spectaculaire ! Vous observerez des T-Rex et Tricératops en toute sécurité. C'est une aventure intense à 89 000€ pour 3 jours. Attention : réservée aux amateurs de sensations fortes !",
  
  prix: "Nos tarifs varient selon la destination : Paris 1889 (45 000€), Florence 1504 (52 000€), Crétacé (89 000€). Tous les voyages incluent l'équipement temporel, les guides experts, les costumes d'époque et l'assurance multi-temporelle.",
  
  sécurité: "La sécurité est notre priorité absolue. Nos protocoles quantiques sont certifiés ISO-Temporal 9001. Chaque voyage est supervisé par des guides temporels experts et nous disposons d'un système d'extraction d'urgence instantanée.",
  
  durée: "Les durées varient : 7 jours pour Paris 1889, 5 jours pour Florence 1504, et 3 jours pour le Crétacé. Chaque voyage est optimisé pour une immersion totale sans fatigue temporelle.",
};

// Fonction pour déterminer la réponse appropriée
function getResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('paris') || lowerMessage.includes('1889') || lowerMessage.includes('belle époque')) {
    return simulatedResponses.paris;
  }
  if (lowerMessage.includes('florence') || lowerMessage.includes('renaissance') || lowerMessage.includes('1504')) {
    return simulatedResponses.florence;
  }
  if (lowerMessage.includes('dinosaure') || lowerMessage.includes('crétacé') || lowerMessage.includes('t-rex') || lowerMessage.includes('préhistoire')) {
    return simulatedResponses.dinosaure;
  }
  if (lowerMessage.includes('prix') || lowerMessage.includes('tarif') || lowerMessage.includes('coût') || lowerMessage.includes('combien')) {
    return simulatedResponses.prix;
  }
  if (lowerMessage.includes('sécurité') || lowerMessage.includes('danger') || lowerMessage.includes('risque')) {
    return simulatedResponses.sécurité;
  }
  if (lowerMessage.includes('durée') || lowerMessage.includes('combien de temps') || lowerMessage.includes('jours')) {
    return simulatedResponses.durée;
  }
  
  return "Je peux vous renseigner sur nos trois destinations phares : Paris 1889 (Belle Époque), Florence 1504 (Renaissance) et le Crétacé (dinosaures). Je peux aussi vous parler des prix, de la sécurité et des durées de voyage. Quelle information vous intéresse ?";
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message invalide' },
        { status: 400 }
      );
    }

    // Simulation d'un délai réaliste
    await new Promise(resolve => setTimeout(resolve, 800));

    const response = getResponse(message);

    return NextResponse.json({ 
      response,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Erreur API chat:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
```

### 5.2 Widget Chatbot : components/chatbot/ChatWidget.tsx

```typescript
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatWindow from './ChatWindow';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Fenêtre de chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <ChatWindow onClose={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bouton flottant */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full shadow-2xl flex items-center justify-center group hover:shadow-amber-500/50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        {/* Icône */}
        {isOpen ? (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}

        {/* Notification badge (optionnel) */}
        {!isOpen && (
          <motion.div
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            1
          </motion.div>
        )}
      </motion.button>
    </>
  );
}
```

### 5.3 Fenêtre de chat : components/chatbot/ChatWindow.tsx

```typescript
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ChatMessage from './ChatMessage';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatWindowProps {
  onClose: () => void;
}

export default function ChatWindow({ onClose }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Bonjour ! Je suis votre assistant voyage temporel. Comment puis-je vous aider aujourd'hui ? 🕰️",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll vers le bas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputValue })
      });

      const data = await response.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Désolé, une erreur s'est produite. Veuillez réessayer.",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-[380px] h-[600px] bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-500 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-2xl">🕰️</span>
          </div>
          <div>
            <h3 className="text-white font-semibold">Assistant Temporel</h3>
            <p className="text-amber-100 text-xs">En ligne</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {isLoading && (
          <div className="flex gap-2 items-center text-gray-400">
            <div className="flex gap-1">
              <motion.div
                className="w-2 h-2 bg-amber-500 rounded-full"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
              />
              <motion.div
                className="w-2 h-2 bg-amber-500 rounded-full"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
              />
              <motion.div
                className="w-2 h-2 bg-amber-500 rounded-full"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
              />
            </div>
            <span className="text-sm">L'assistant réfléchit...</span>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-800 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Posez-moi vos questions sur les voyages temporels..."
            className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-gray-500"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className="bg-amber-500 text-white px-4 py-3 rounded-lg hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
```

### 5.4 Message component : components/chatbot/ChatMessage.tsx

```typescript
'use client';

import { motion } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.sender === 'bot';

  return (
    <motion.div
      className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`max-w-[80%] ${isBot ? 'order-2' : 'order-1'}`}>
        <div
          className={`rounded-2xl px-4 py-3 ${
            isBot
              ? 'bg-gray-800 text-gray-100'
              : 'bg-gradient-to-r from-amber-600 to-amber-500 text-white'
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
        </div>
        <p className="text-xs text-gray-500 mt-1 px-2">
          {message.timestamp.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </div>

      {isBot && (
        <div className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center mr-2 order-1">
          <span className="text-lg">🤖</span>
        </div>
      )}
    </motion.div>
  );
}
```

---

## 6. Variants d'animations Framer Motion

### lib/animations/variants.ts

```typescript
// Variants pour fade-in au scroll
export const fadeInUpVariants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: delay,
      ease: 'easeOut'
    }
  })
};

// Variants pour stagger de liste
export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

// Variants pour scale au hover
export const scaleHoverVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  },
  tap: { 
    scale: 0.95,
    transition: {
      duration: 0.2
    }
  }
};

// Variants pour glow effect
export const glowVariants = {
  initial: { 
    boxShadow: '0 0 0 rgba(251, 191, 36, 0)' 
  },
  hover: { 
    boxShadow: '0 0 30px rgba(251, 191, 36, 0.5)',
    transition: {
      duration: 0.3
    }
  }
};
```

---

## 7. Configuration Tailwind

### tailwind.config.ts

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Palette dorée personnalisée
        'gold': {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}

export default config
```

---

## 8. Installation et démarrage

### Installation

```bash
# Créer le projet Next.js
npx create-next-app@latest timetravel-agency --typescript --tailwind --app

cd timetravel-agency

# Installer Framer Motion
npm install framer-motion

# Installer les dépendances optionnelles
npm install clsx tailwind-merge
```

### Structure minimale à créer

```bash
mkdir -p components/{layout,home,destinations,booking,chatbot,ui}
mkdir -p lib/{data,animations,utils}
mkdir -p public/{videos,images/destinations}
```

### Lancement

```bash
npm run dev
```

---

## 9. Checklist de développement

### Phase 1 : Base (prioritaire)
- [ ] Hero section avec vidéo et animation titre
- [ ] Présentation de l'agence avec fade-in
- [ ] Data destinations (destinations.ts)
- [ ] Galerie de cards avec hover effects

### Phase 2 : Pages détaillées
- [ ] Page de détails par destination
- [ ] Layout et navigation
- [ ] Footer

### Phase 3 : Chatbot
- [ ] API route `/api/chat`
- [ ] Widget flottant
- [ ] Fenêtre de chat
- [ ] Messages et logique

### Phase 4 : Optionnel
- [ ] Formulaire de réservation
- [ ] Page de confirmation
- [ ] Animations supplémentaires (particules, parallax)

---

## 10. Points d'attention

### Performance
- Lazy load des images avec Next/Image
- Code splitting automatique de Next.js
- Optimiser les animations (utiliser `transform` et `opacity`)

### Accessibilité
- Alt text sur toutes les images
- Contraste suffisant pour la lisibilité
- Navigation au clavier fonctionnelle
- ARIA labels sur les éléments interactifs

### Responsive
- Tester sur mobile/tablette/desktop
- Breakpoints Tailwind : sm (640px), md (768px), lg (1024px), xl (1280px)
- Menu mobile hamburger si nécessaire

### SEO
- Metadata dans layout.tsx
- Balises sémantiques HTML5
- Sitemap et robots.txt

---

## 11. Ressources utiles

### Documentation
- Next.js : https://nextjs.org/docs
- Framer Motion : https://www.framer.com/motion/
- Tailwind CSS : https://tailwindcss.com/docs

### Assets
- Vidéos libres de droits : Pexels, Pixabay, Coverr
- Images : Unsplash, Pexels
- Icônes : Heroicons, Lucide

### Polices recommandées
- Titre/Serif : Playfair Display, Cinzel, Cormorant
- Corps : Inter, Montserrat, Poppins

---

## Personnalité du chatbot (rappel)

**Rôle** : Assistant virtuel officiel de TimeTravel Agency

**Ton** :
- Professionnel mais chaleureux
- Passionné d'histoire
- Enthousiaste sans excès
- Expert crédible en voyage temporel

**Connaissances** :
- Paris 1889 : Belle Époque, Tour Eiffel, Exposition Universelle
- Florence 1504 : Renaissance, Michel-Ange, Léonard de Vinci, Médicis
- Crétacé -65M : Dinosaures (T-Rex, Tricératops, Vélociraptor), nature préhistorique

**Capacités** :
- Suggérer une destination selon les intérêts
- Expliquer les prix et inclusions
- Rassurer sur la sécurité
- Donner des conseils pratiques

---

## Prêt à commencer ?

Ce guide fournit une base solide pour développer TimeTravel Agency. Commence par la Phase 1, teste régulièrement, et itère progressivement.

**Bon voyage dans le temps !** 🕰️✨