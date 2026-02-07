export const toggleDyslexiaFont = (enabled: boolean): void => {
  if (enabled) {
    document.body.classList.add('dyslexia-font');
  } else {
    document.body.classList.remove('dyslexia-font');
  }
};

export const toggleHighContrast = (enabled: boolean): void => {
  if (enabled) {
    document.body.classList.add('high-contrast');
  } else {
    document.body.classList.remove('high-contrast');
  }
};

export const formatDate = (dateString: string, language: 'de' | 'fr' = 'de'): string => {
  const date = new Date(dateString);
  const locale = language === 'de' ? 'de-DE' : 'fr-FR';
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getTimeOfDayGreeting = (language: 'de' | 'fr' = 'de'): string => {
  const hour = new Date().getHours();
  if (language === 'de') {
    if (hour < 12) return 'Guten Morgen';
    if (hour < 18) return 'Guten Tag';
    return 'Guten Abend';
  }
  if (hour < 12) return 'Bonjour';
  if (hour < 18) return 'Bon après-midi';
  return 'Bonsoir';
};

export const getMoodEmoji = (mood: string): string => {
  const emojiMap: Record<string, string> = {
    happy: '😊',
    sad: '😢',
    angry: '😠',
    anxious: '😰',
    calm: '😌',
    confused: '🤔',
    excited: '🤩',
    tired: '😴',
    lonely: '🥺',
    proud: '🥳',
    frustrated: '😤',
    hopeful: '🌟',
  };
  return emojiMap[mood] || '😊';
};

export const getMoodLabel = (mood: string, language: 'de' | 'fr' = 'de'): string => {
  const labels: Record<string, Record<string, string>> = {
    de: {
      happy: 'Glücklich',
      sad: 'Traurig',
      angry: 'Wütend',
      anxious: 'Ängstlich',
      calm: 'Ruhig',
      confused: 'Verwirrt',
      excited: 'Aufgeregt',
      tired: 'Müde',
      lonely: 'Einsam',
      proud: 'Stolz',
      frustrated: 'Frustriert',
      hopeful: 'Hoffnungsvoll',
    },
    fr: {
      happy: 'Heureux',
      sad: 'Triste',
      angry: 'En colère',
      anxious: 'Anxieux',
      calm: 'Calme',
      confused: 'Confus',
      excited: 'Excité',
      tired: 'Fatigué',
      lonely: 'Seul',
      proud: 'Fier',
      frustrated: 'Frustré',
      hopeful: 'Plein d\'espoir',
    },
  };
  return labels[language]?.[mood] || mood;
};
