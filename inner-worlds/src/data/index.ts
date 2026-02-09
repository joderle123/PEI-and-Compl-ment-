import { volcanoScenarios, volcanoActivities, volcanoWisdomCards } from './islands/volcano';
import { oceanScenarios, oceanActivities, oceanWisdomCards } from './islands/ocean';
import { forestScenarios, forestActivities, forestWisdomCards } from './islands/forest';
import { mountainScenarios, mountainActivities, mountainWisdomCards } from './islands/mountain';
import { gardenScenarios, gardenActivities, gardenWisdomCards } from './islands/garden';
import { nightScenarios, nightActivities, nightWisdomCards } from './islands/night';
import { rainbowScenarios, rainbowActivities, rainbowWisdomCards } from './islands/rainbow';
import { homeScenarios, homeActivities, homeWisdomCards } from './islands/home';

export const allScenarios: Record<string, any[]> = {
  volcano: volcanoScenarios,
  ocean: oceanScenarios,
  forest: forestScenarios,
  mountain: mountainScenarios,
  garden: gardenScenarios,
  night: nightScenarios,
  rainbow: rainbowScenarios,
  home: homeScenarios,
};

export const allActivities: Record<string, any[]> = {
  volcano: volcanoActivities,
  ocean: oceanActivities,
  forest: forestActivities,
  mountain: mountainActivities,
  garden: gardenActivities,
  night: nightActivities,
  rainbow: rainbowActivities,
  home: homeActivities,
};

export const allWisdomCards: Record<string, any[]> = {
  volcano: volcanoWisdomCards,
  ocean: oceanWisdomCards,
  forest: forestWisdomCards,
  mountain: mountainWisdomCards,
  garden: gardenWisdomCards,
  night: nightWisdomCards,
  rainbow: rainbowWisdomCards,
  home: homeWisdomCards,
};

export const getIslandData = (islandId: string) => ({
  scenarios: allScenarios[islandId] || [],
  activities: allActivities[islandId] || [],
  wisdomCards: allWisdomCards[islandId] || [],
});

export const getAllWisdomCards = () => {
  return Object.values(allWisdomCards).flat();
};
