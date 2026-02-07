import { volcanoScenarios, volcanoActivities, volcanoWisdomCards, volcanoNPCs } from './islands/volcano';
import { oceanScenarios, oceanActivities, oceanWisdomCards, oceanNPCs } from './islands/ocean';
import { forestScenarios, forestActivities, forestWisdomCards, forestNPCs } from './islands/forest';
import { mountainScenarios, mountainActivities, mountainWisdomCards, mountainNPCs } from './islands/mountain';
import { gardenScenarios, gardenActivities, gardenWisdomCards, gardenNPCs } from './islands/garden';
import { nightScenarios, nightActivities, nightWisdomCards, nightNPCs } from './islands/night';
import { rainbowScenarios, rainbowActivities, rainbowWisdomCards, rainbowNPCs } from './islands/rainbow';
import { homeScenarios, homeActivities, homeWisdomCards, homeNPCs } from './islands/home';

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

export const allNPCs: Record<string, any[]> = {
  volcano: volcanoNPCs,
  ocean: oceanNPCs,
  forest: forestNPCs,
  mountain: mountainNPCs,
  garden: gardenNPCs,
  night: nightNPCs,
  rainbow: rainbowNPCs,
  home: homeNPCs,
};

export const getIslandData = (islandId: string) => ({
  scenarios: allScenarios[islandId] || [],
  activities: allActivities[islandId] || [],
  wisdomCards: allWisdomCards[islandId] || [],
  npcs: allNPCs[islandId] || [],
});

export const getAllWisdomCards = () => {
  return Object.values(allWisdomCards).flat();
};
