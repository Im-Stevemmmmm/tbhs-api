const routeBuilder = (base: string) => (route: string) => `${base}/${route}`;

const gameDataRoute = routeBuilder("game-data");

const pitDataRoute = gameDataRoute("the-pit");

export const pitStatsRoute = routeBuilder(pitDataRoute);
