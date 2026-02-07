import type { Companion } from '../types';

export const companionTemplates: Omit<Companion, 'level' | 'evolutionStage'>[] = [
  {
    id: 'wolf',
    name: 'Lupo',
    type: 'wolf',
    trait: 'Mut & Stärke',
    description:
      'Lupo ist ein mutiger Wolf, der immer für seine Freunde einsteht. Er weiß, dass wahre Stärke nicht bedeutet, keine Angst zu haben – sondern trotzdem weiterzumachen.',
  },
  {
    id: 'owl',
    name: 'Sophia',
    type: 'owl',
    trait: 'Weisheit & Klarheit',
    description:
      'Sophia ist eine weise Eule, die gerne nachdenkt und kluge Lösungen findet. Sie weiß, dass es okay ist, sich Zeit zum Überlegen zu nehmen.',
  },
  {
    id: 'fox',
    name: 'Felix',
    type: 'fox',
    trait: 'Kreativität & Neugier',
    description:
      'Felix ist ein neugieriger Fuchs, der immer neue Wege entdeckt. Er weiß, dass jedes Problem eine kreative Lösung hat – man muss nur genau hinschauen.',
  },
  {
    id: 'turtle',
    name: 'Cleo',
    type: 'turtle',
    trait: 'Geduld & Ruhe',
    description:
      'Cleo ist eine geduldige Schildkröte, die sich nie hetzen lässt. Sie weiß, dass die besten Dinge Zeit brauchen und dass Pausen wichtig sind.',
  },
];

export const companionEmojis: Record<string, string> = {
  wolf: '🐺',
  owl: '🦉',
  fox: '🦊',
  turtle: '🐢',
};

export const companionEncouragements: string[] = [
  'Du machst das toll!',
  'Ich bin stolz auf dich!',
  'Jeder Schritt zählt.',
  'Du bist stärker als du denkst.',
  'Zusammen schaffen wir das!',
  'Fehler sind Lernchancen.',
  'Deine Gefühle sind wichtig.',
  'Du bist einzigartig – und das ist super!',
  'Mut bedeutet, es trotzdem zu versuchen.',
  'Du bist nicht allein auf dieser Reise.',
  'Heute ist ein guter Tag zum Wachsen.',
  'Sei nett zu dir selbst!',
  'Kleine Schritte führen auch zum Ziel.',
  'Du darfst so fühlen, wie du fühlst.',
  'Hilfe holen ist eine Superkraft!',
];

export const getCompanionEmoji = (type: string): string => {
  return companionEmojis[type] || '🌟';
};

export const getRandomEncouragement = (): string => {
  return companionEncouragements[
    Math.floor(Math.random() * companionEncouragements.length)
  ];
};
