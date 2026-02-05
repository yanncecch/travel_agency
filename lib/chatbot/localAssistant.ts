export type DestinationKey = 'paris' | 'florence' | 'cretace';

export type QualificationStep = 'none' | 'interest' | 'budget' | 'intensity' | 'done';

export type AssistantContext = {
  lastDestination?: DestinationKey;
  qualificationStep: QualificationStep;
  preferences: {
    interest?: 'art' | 'elegance' | 'adventure';
    budget?: 'flex' | 'premium' | 'elite';
    intensity?: 'soft' | 'balanced' | 'extreme';
  };
};

type DestinationProfile = {
  title: string;
  price: string;
  duration: string;
  angle: string;
  advice: string;
  bestFor: Array<'art' | 'elegance' | 'adventure'>;
};

type AssistantReply = {
  reply: string;
  context: AssistantContext;
  suggestions: string[];
};

const destinations: Record<DestinationKey, DestinationProfile> = {
  paris: {
    title: 'Paris 1889 - Belle Epoque',
    price: '45 000 EUR',
    duration: '7 jours',
    angle: "Idéal pour l'élégance, l'architecture et l'effervescence de l'Exposition Universelle.",
    advice: 'Privilégiez une mission culturelle premium avec tenue Belle Epoque incluse.',
    bestFor: ['elegance']
  },
  florence: {
    title: 'Florence 1504 - Renaissance',
    price: '52 000 EUR',
    duration: '5 jours',
    angle: "Parfait pour les passionnés d'art, de Michel-Ange et de culture humaniste.",
    advice: 'Le parcours atelier + palais Médicis est le plus demandé.',
    bestFor: ['art']
  },
  cretace: {
    title: 'Crétacé -65M - Dinosaures',
    price: '89 000 EUR',
    duration: '3 jours',
    angle: "Expérience la plus intense: observation de dinosaures en environnement extrême sécurisé.",
    advice: 'Destination recommandée aux voyageurs orientés aventure et sensations fortes.',
    bestFor: ['adventure']
  }
};

const introReplies = [
  'Bienvenue chez TimeTravel Agency. Je peux vous guider selon vos goûts, votre budget et le niveau d\'intensité souhaité.',
  'Ravi de vous accompagner. Nous allons choisir ensemble la période la plus adaptée à votre profil de voyageur temporel.',
  'Bonjour, je suis votre assistant temporel. Je peux vous proposer une époque sur mesure en quelques questions.'
];

const pricingReplies = [
  'Nos tarifs indicatifs sont: Paris 1889 (45 000 EUR), Florence 1504 (52 000 EUR), Crétacé -65M (89 000 EUR). Tout inclut: guide expert, logistique temporelle et assurance premium.',
  'Pour la gamme actuelle: 45 000 EUR, 52 000 EUR et 89 000 EUR selon la destination. Chaque mission inclut sécurité, immersion et accompagnement privé.'
];

const safetyReplies = [
  "La sécurité est prioritaire: briefing comportemental, équipement certifié, supervision continue et extraction d'urgence en quelques secondes.",
  "Chaque mission passe par un protocole strict: préparation médicale, check paradoxal et assistance sur toute la ligne temporelle."
];

function pickVariant<T>(list: T[], seed: string) {
  const index = seed.length % list.length;
  return list[index];
}

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function extractDestination(input: string): DestinationKey | undefined {
  const text = normalize(input);

  if (/(paris|1889|tour eiffel|belle epoque)/.test(text)) return 'paris';
  if (/(florence|1504|renaissance|michel|medicis|leonard)/.test(text)) return 'florence';
  if (/(cretace|dinosaure|dino|t-rex|trex|prehistoire|65)/.test(text)) return 'cretace';

  return undefined;
}

function extractInterest(input: string) {
  const text = normalize(input);
  if (/(art|culture|peinture|sculpture|histoire de l art)/.test(text)) return 'art' as const;
  if (/(elegance|architecture|romantique|raffine|urbain)/.test(text)) return 'elegance' as const;
  if (/(aventure|adrenaline|sensation|extreme|dinosaure|nature)/.test(text)) return 'adventure' as const;
  return undefined;
}

function extractBudget(input: string) {
  const text = normalize(input);
  if (/(45|50|raisonnable|contenu|mesure)/.test(text)) return 'flex' as const;
  if (/(60|70|premium|confort)/.test(text)) return 'premium' as const;
  if (/(80|90|100|elite|sans limite|illimite)/.test(text)) return 'elite' as const;
  return undefined;
}

function extractIntensity(input: string) {
  const text = normalize(input);
  if (/(doux|calme|soft|tranquille)/.test(text)) return 'soft' as const;
  if (/(equilibre|modere|balanced|normal)/.test(text)) return 'balanced' as const;
  if (/(intense|fort|extreme|adr[ée]naline)/.test(text)) return 'extreme' as const;
  return undefined;
}

function isAffirmative(input: string) {
  const text = normalize(input).trim();
  return /^(oui|ouais|yes|ok|okay|dac|daccord|vas y|go|allons y)$/.test(text);
}

function isNegative(input: string) {
  const text = normalize(input).trim();
  return /^(non|no|pas maintenant|plus tard)$/.test(text);
}

function destinationFromPreferences(context: AssistantContext): DestinationKey {
  const { interest, budget, intensity } = context.preferences;

  if (interest === 'art') return 'florence';
  if (interest === 'elegance') return 'paris';
  if (interest === 'adventure') return 'cretace';

  if (intensity === 'extreme' || budget === 'elite') return 'cretace';
  if (intensity === 'soft' || budget === 'flex') return 'paris';

  return 'florence';
}

function buildDestinationReply(destination: DestinationKey) {
  const selected = destinations[destination];
  return `${selected.title}: ${selected.angle} Prix indicatif ${selected.price} pour ${selected.duration}. Conseil: ${selected.advice}`;
}

function qualificationPrompt(step: QualificationStep) {
  if (step === 'interest') {
    return {
      reply: 'Question 1/3: quel univers vous attire le plus: art & culture, élégance urbaine, ou aventure préhistorique ?',
      suggestions: ['Art et culture', 'Elegance urbaine', 'Aventure prehistorique']
    };
  }

  if (step === 'budget') {
    return {
      reply: 'Question 2/3: sur quel niveau de budget souhaitez-vous vous positionner ?',
      suggestions: ['Budget contenu', 'Premium confortable', 'Elite sans compromis']
    };
  }

  if (step === 'intensity') {
    return {
      reply: 'Question 3/3: vous préférez une mission douce, équilibrée, ou très intense ?',
      suggestions: ['Plutot douce', 'Equilibree', 'Tres intense']
    };
  }

  return {
    reply: '',
    suggestions: []
  };
}

function nextStepAfter(current: QualificationStep): QualificationStep {
  if (current === 'interest') return 'budget';
  if (current === 'budget') return 'intensity';
  if (current === 'intensity') return 'done';
  return 'done';
}

function suggestionsForContext(context: AssistantContext): string[] {
  if (context.qualificationStep === 'interest' || context.qualificationStep === 'budget' || context.qualificationStep === 'intensity') {
    return qualificationPrompt(context.qualificationStep).suggestions;
  }

  return ['Compare Paris et Florence', 'Quel est le plus sûr ?', 'Je veux réserver'];
}

export function getInitialContext(): AssistantContext {
  return {
    qualificationStep: 'none',
    preferences: {}
  };
}

export function buildAssistantReply(message: string, context: AssistantContext): AssistantReply {
  const text = normalize(message);

  if (!text.trim()) {
    return {
      reply:
        'Je peux vous aider sur les destinations, les prix, la sécurité et le choix d\'une époque. Souhaitez-vous démarrer une recommandation personnalisée en 3 questions ?',
      context,
      suggestions: ['Lancer la recommandation']
    };
  }

  if (/(lancer la recommandation|recommandation personnalisee|3 questions|commencer)/.test(text)) {
    const nextContext: AssistantContext = {
      ...context,
      qualificationStep: 'interest'
    };

    const prompt = qualificationPrompt(nextContext.qualificationStep);
    return {
      reply: prompt.reply,
      context: nextContext,
      suggestions: prompt.suggestions
    };
  }

  if (isAffirmative(text) && (context.qualificationStep === 'none' || context.qualificationStep === 'done')) {
    const nextContext: AssistantContext = {
      ...context,
      qualificationStep: 'interest'
    };
    const prompt = qualificationPrompt(nextContext.qualificationStep);
    return {
      reply: `Parfait, on démarre. ${prompt.reply}`,
      context: nextContext,
      suggestions: prompt.suggestions
    };
  }

  if (isNegative(text) && (context.qualificationStep === 'none' || context.qualificationStep === 'done')) {
    return {
      reply: 'Très bien. Je peux alors vous répondre directement sur les prix, la sécurité ou comparer deux destinations.',
      context,
      suggestions: ['Quels sont vos tarifs ?', 'Le voyage est-il sûr ?', 'Comparer Paris et Florence']
    };
  }

  if (context.qualificationStep === 'interest') {
    const interest = extractInterest(text);
    if (!interest) {
      const prompt = qualificationPrompt('interest');
      return {
        reply: `Je n'ai pas bien saisi votre préférence. ${prompt.reply}`,
        context,
        suggestions: prompt.suggestions
      };
    }
    const nextContext: AssistantContext = {
      ...context,
      preferences: { ...context.preferences, interest },
      qualificationStep: nextStepAfter(context.qualificationStep)
    };

    const prompt = qualificationPrompt(nextContext.qualificationStep);
    return {
      reply: interest ? `Parfait, je note un intérêt ${interest === 'art' ? 'artistique' : interest === 'elegance' ? 'pour l\'élégance historique' : 'pour l\'aventure'}. ${prompt.reply}` : `Merci. ${prompt.reply}`,
      context: nextContext,
      suggestions: prompt.suggestions
    };
  }

  if (context.qualificationStep === 'budget') {
    const budget = extractBudget(text);
    if (!budget) {
      const prompt = qualificationPrompt('budget');
      return {
        reply: `Je n'ai pas bien identifié votre budget. ${prompt.reply}`,
        context,
        suggestions: prompt.suggestions
      };
    }
    const nextContext: AssistantContext = {
      ...context,
      preferences: { ...context.preferences, budget },
      qualificationStep: nextStepAfter(context.qualificationStep)
    };

    const prompt = qualificationPrompt(nextContext.qualificationStep);
    return {
      reply: budget ? `Très bien, budget ${budget === 'flex' ? 'contenu' : budget === 'premium' ? 'premium' : 'élite'}. ${prompt.reply}` : `Compris. ${prompt.reply}`,
      context: nextContext,
      suggestions: prompt.suggestions
    };
  }

  if (context.qualificationStep === 'intensity') {
    const intensity = extractIntensity(text);
    if (!intensity) {
      const prompt = qualificationPrompt('intensity');
      return {
        reply: `Je n'ai pas bien compris le niveau d'intensité souhaité. ${prompt.reply}`,
        context,
        suggestions: prompt.suggestions
      };
    }
    const nextContext: AssistantContext = {
      ...context,
      preferences: { ...context.preferences, intensity },
      qualificationStep: nextStepAfter(context.qualificationStep)
    };

    const recommended = destinationFromPreferences(nextContext);

    return {
      reply: `Merci, profil complété. Je recommande ${destinations[recommended].title}. ${destinations[recommended].angle} Prix ${destinations[recommended].price} pour ${destinations[recommended].duration}.`,
      context: { ...nextContext, lastDestination: recommended },
      suggestions: ['Pourquoi ce choix ?', 'Voir le prix détaillé', 'Aller à la réservation']
    };
  }

  if (/(bonjour|salut|hello|bonsoir)/.test(text)) {
    return {
      reply: pickVariant(introReplies, text),
      context,
      suggestions: ['Lancer la recommandation', 'Quels sont vos tarifs ?', 'Quelle destination pour moi ?']
    };
  }

  if (/(prix|tarif|cout|combien)/.test(text)) {
    return {
      reply: pickVariant(pricingReplies, text),
      context,
      suggestions: ['Paris 1889', 'Florence 1504', 'Crétacé -65M']
    };
  }

  if (/(securite|danger|risque|fiable)/.test(text)) {
    return {
      reply: pickVariant(safetyReplies, text),
      context,
      suggestions: ['Quel est le plus sûr ?', 'Mission douce recommandée']
    };
  }

  if (/(compare paris et florence|paris ou florence)/.test(text)) {
    return {
      reply:
        "Paris 1889 est plus mondain et architectural, Florence 1504 est plus artistique et intellectuelle. Si vous hésitez: Paris pour l'ambiance, Florence pour la profondeur culturelle.",
      context,
      suggestions: ['Je choisis Paris', 'Je choisis Florence', 'Lancer la recommandation']
    };
  }

  if (/(quel est le plus sur|mission douce recommandee)/.test(text)) {
    return {
      reply:
        'La mission la plus douce est Paris 1889: environnement urbain stable, rythme progressif et immersion très confortable pour une première expérience.',
      context: { ...context, lastDestination: 'paris' },
      suggestions: ['Voir le prix détaillé', 'Je veux réserver']
    };
  }

  if (/(pourquoi ce choix)/.test(text) && context.lastDestination) {
    const selected = destinations[context.lastDestination];
    return {
      reply: `Je vous oriente vers ${selected.title} car cela correspond à vos préférences enregistrées. ${selected.angle}`,
      context,
      suggestions: ['Voir le prix détaillé', 'Je veux réserver']
    };
  }

  if (/(voir le prix detaille|prix detaille)/.test(text) && context.lastDestination) {
    const selected = destinations[context.lastDestination];
    return {
      reply: `Pour ${selected.title}, comptez ${selected.price} pour ${selected.duration}, incluant préparation, sécurité, logistique et accompagnement expert.`,
      context,
      suggestions: ['Je veux réserver', 'Autre destination']
    };
  }

  if (/(reserver|reservation|book|disponibilite|je veux reserver|aller a la reservation)/.test(text)) {
    return {
      reply:
        'Parfait. Rendez-vous sur la page Réservation pour valider date, destination et nombre de voyageurs. Je reste disponible pour vous aider à trancher avant validation.',
      context,
      suggestions: ['Paris 1889', 'Florence 1504', 'Crétacé -65M']
    };
  }

  const destination = extractDestination(text);
  if (destination) {
    return {
      reply: buildDestinationReply(destination),
      context: { ...context, lastDestination: destination },
      suggestions: ['Voir le prix détaillé', 'Comparer avec une autre destination', 'Je veux réserver']
    };
  }

  if (/(quel destination|je ne sais pas|quoi choisir|j hesite|j'hesite|conseille|recommande)/.test(text)) {
    const inferred = extractInterest(text);
    const recommended = inferred
      ? inferred === 'art'
        ? 'florence'
        : inferred === 'elegance'
          ? 'paris'
          : 'cretace'
      : context.lastDestination ?? destinationFromPreferences(context);

    return {
      reply: `Je vous recommande ${destinations[recommended].title}. ${destinations[recommended].angle} Budget indicatif: ${destinations[recommended].price}.`,
      context: { ...context, lastDestination: recommended },
      suggestions: ['Pourquoi ce choix ?', 'Lancer la recommandation', 'Je veux réserver']
    };
  }

  if (/(duree|combien de temps|jours)/.test(text) && context.lastDestination) {
    const selected = destinations[context.lastDestination];
    return {
      reply: `${selected.title} se déroule en général sur ${selected.duration}.`,
      context,
      suggestions: suggestionsForContext(context)
    };
  }

  return {
    reply:
      'Je peux vous aider sur les destinations, les prix, la sécurité et la réservation. Souhaitez-vous que je lance la recommandation personnalisée en 3 questions ?',
    context,
    suggestions: ['Lancer la recommandation', 'Quels sont vos tarifs ?', 'Comparer Paris et Florence']
  };
}
