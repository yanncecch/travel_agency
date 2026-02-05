# TimeTravel Agency

Site web immersif construit avec **Next.js** pour une agence fictive de voyage temporel de luxe.

## Aperçu

TimeTravel Agency propose une expérience premium autour de 3 époques:

- **Paris 1889** (Belle Époque)
- **Florence 1504** (Renaissance)
- **Crétacé -65M** (Dinosaures)

L'application met l'accent sur l'immersion visuelle, les animations fluides et une expérience utilisateur haut de gamme.

## Fonctionnalités

### Expérience web

- Hero plein écran animé (ambiance cosmique / portail temporel)
- Présentation agence + valeurs
- Sections enrichies: métriques, timeline de mission, témoignages, FAQ animée
- Galerie interactive de destinations avec hover premium
- Pages détaillées par destination (historique, expériences, programme type, conseils)
- Formulaire de réservation avec validation et estimation dynamique du budget
- Comparateur express des destinations (durée, prix, intensité)

### Chatbot (sans API externe)

- Widget flottant en bas à droite
- Moteur local intelligent (pas de branchement IA externe)
- Réponses contextuelles avec **mémoire de conversation**
- Mini script de qualification en **3 questions**:
  - centres d'intérêt
  - budget
  - niveau d'intensité
- Recommandations personnalisées + suggestions rapides cliquables

## Stack technique

- **Framework**: Next.js 15 (App Router)
- **UI**: React 19
- **Style**: Tailwind CSS
- **Animations**: Framer Motion
- **Langage**: TypeScript

## Structure du projet

```text
travel_agency/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── template.tsx
│   ├── booking/page.tsx
│   ├── destinations/page.tsx
│   ├── destinations/[slug]/page.tsx
│   └── api/chat/route.ts
├── components/
│   ├── booking/
│   ├── chatbot/
│   ├── destinations/
│   ├── home/
│   ├── layout/
│   └── ui/
├── lib/
│   ├── animations/
│   ├── chatbot/
│   └── data/
├── public/
└── README.md
```

## Installation locale

### Prérequis

- Node.js 20+
- npm 10+

### Démarrage

```bash
npm install
npm run dev
```

Application disponible sur `http://localhost:3000`.

## Scripts utiles

```bash
npm run dev     # mode développement
npm run lint    # lint ESLint
npm run build   # build production
npm run start   # démarrer en production
```

## Déploiement

### Vercel (recommandé)

1. Pousser le repo sur GitHub
2. Importer le projet sur https://vercel.com/new
3. Déployer (Next.js détecté automatiquement)

## Personnalisation rapide

- Données destinations: `lib/data/destinations.ts`
- Logique chatbot local: `lib/chatbot/localAssistant.ts`
- UI chatbot: `components/chatbot/ChatWindow.tsx`
- Sections homepage: `components/home/*`
- Thème global: `app/globals.css` et `tailwind.config.ts`

## Roadmap possible

- Ajouter un back-office de gestion des destinations
- Ajouter persistance des conversations chatbot (localStorage)
- Ajouter mode multilingue FR/EN
- Ajouter analytics (trafic, conversion réservation)
- Connecter le formulaire de réservation à une vraie API

## Licence

Projet démo / fictif, usage libre pour prototypage et portfolio.
