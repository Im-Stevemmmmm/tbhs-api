-- CreateTable
CREATE TABLE "Player" (
    "uuid" TEXT NOT NULL,
    "rank" TEXT NOT NULL DEFAULT E'noob',

    PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "PitData" (
    "playerUuid" TEXT NOT NULL,
    "offensiveStatsId" INTEGER NOT NULL,
    "defensiveStatsId" INTEGER NOT NULL,
    "performanceStatsId" INTEGER NOT NULL,
    "perksAndMysticStatsId" INTEGER NOT NULL,
    "miscellaneousStatsId" INTEGER NOT NULL,
    "farmingStatsId" INTEGER NOT NULL,
    "prestigeStatsId" INTEGER NOT NULL,

    PRIMARY KEY ("playerUuid")
);

-- CreateTable
CREATE TABLE "OffensiveStats" (
"id" SERIAL,
    "kills" INTEGER NOT NULL DEFAULT 0,
    "assists" INTEGER NOT NULL DEFAULT 0,
    "swordHits" INTEGER NOT NULL DEFAULT 0,
    "arrowsShot" INTEGER NOT NULL DEFAULT 0,
    "arrowsHit" INTEGER NOT NULL DEFAULT 0,
    "damageDealt" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "meleeDamageDealt" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "bowDamageDealt" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "highestStreak" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DefensiveStats" (
"id" SERIAL,
    "deaths" INTEGER NOT NULL DEFAULT 0,
    "damageTaken" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "meleeDamageTaken" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "bowDamageTaken" DECIMAL(65,30) NOT NULL DEFAULT 0,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PerformanceStats" (
"id" SERIAL,
    "xp" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "xpPerHour" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "goldEarned" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "goldPerHour" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "killDeathRatio" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "killDeathPlusAssistRatio" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "killsAndAssistsPerHour" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "damageDealtOverTakenRatio" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "bowAccuracy" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "contractsStarted" INTEGER NOT NULL DEFAULT 0,
    "contractsCompleted" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PerksAndMysticStats" (
"id" SERIAL,
    "goldenApplesEaten" INTEGER NOT NULL DEFAULT 0,
    "goldenHeadsEaten" INTEGER NOT NULL DEFAULT 0,
    "lavaBucketsEmptied" INTEGER NOT NULL DEFAULT 0,
    "fishingRodsLaunched" INTEGER NOT NULL DEFAULT 0,
    "soupsDrank" INTEGER NOT NULL DEFAULT 0,
    "tierOneMysticsEnchanted" INTEGER NOT NULL DEFAULT 0,
    "tierTwoMysticsEnchanted" INTEGER NOT NULL DEFAULT 0,
    "tierThreeMysticsEnchanted" INTEGER NOT NULL DEFAULT 0,
    "darkPantsEnchanted" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MiscellaneousStats" (
"id" SERIAL,
    "playtime" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "leftClicks" INTEGER NOT NULL DEFAULT 0,
    "diamondItemsPurchased" INTEGER NOT NULL DEFAULT 0,
    "chatMessages" INTEGER NOT NULL DEFAULT 0,
    "blocksPlaced" INTEGER NOT NULL DEFAULT 0,
    "blocksBroken" INTEGER NOT NULL DEFAULT 0,
    "jumpsIntoPit" INTEGER NOT NULL DEFAULT 0,
    "launcherLaunches" INTEGER NOT NULL DEFAULT 0,
    "dailyTradeLimits" INTEGER NOT NULL DEFAULT 0,
    "goldTradeLimits" INTEGER NOT NULL DEFAULT 0,
    "genisisPoints" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FarmingStats" (
"id" SERIAL,
    "wheatFarmed" INTEGER NOT NULL DEFAULT 0,
    "fishedAnything" INTEGER NOT NULL DEFAULT 0,
    "fishedFish" INTEGER NOT NULL DEFAULT 0,
    "fishSold" INTEGER NOT NULL DEFAULT 0,
    "hayBalesSold" INTEGER NOT NULL DEFAULT 0,
    "kingsQuestCompleted" INTEGER NOT NULL DEFAULT 0,
    "sewerTreasuresFound" INTEGER NOT NULL DEFAULT 0,
    "nightQuestsCompleted" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrestigeStats" (
"id" SERIAL,
    "prestige" INTEGER NOT NULL DEFAULT 0,
    "currentRenown" INTEGER NOT NULL DEFAULT 0,
    "lifetimeRenown" INTEGER NOT NULL DEFAULT 0,
    "renownShopCompletion" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PitData_playerUuid_unique" ON "PitData"("playerUuid");

-- CreateIndex
CREATE UNIQUE INDEX "PitData_offensiveStatsId_unique" ON "PitData"("offensiveStatsId");

-- CreateIndex
CREATE UNIQUE INDEX "PitData_defensiveStatsId_unique" ON "PitData"("defensiveStatsId");

-- CreateIndex
CREATE UNIQUE INDEX "PitData_performanceStatsId_unique" ON "PitData"("performanceStatsId");

-- CreateIndex
CREATE UNIQUE INDEX "PitData_perksAndMysticStatsId_unique" ON "PitData"("perksAndMysticStatsId");

-- CreateIndex
CREATE UNIQUE INDEX "PitData_miscellaneousStatsId_unique" ON "PitData"("miscellaneousStatsId");

-- CreateIndex
CREATE UNIQUE INDEX "PitData_farmingStatsId_unique" ON "PitData"("farmingStatsId");

-- AddForeignKey
ALTER TABLE "PitData" ADD FOREIGN KEY("playerUuid")REFERENCES "Player"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PitData" ADD FOREIGN KEY("offensiveStatsId")REFERENCES "OffensiveStats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PitData" ADD FOREIGN KEY("defensiveStatsId")REFERENCES "DefensiveStats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PitData" ADD FOREIGN KEY("performanceStatsId")REFERENCES "PerformanceStats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PitData" ADD FOREIGN KEY("perksAndMysticStatsId")REFERENCES "PerksAndMysticStats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PitData" ADD FOREIGN KEY("miscellaneousStatsId")REFERENCES "MiscellaneousStats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PitData" ADD FOREIGN KEY("farmingStatsId")REFERENCES "FarmingStats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PitData" ADD FOREIGN KEY("prestigeStatsId")REFERENCES "PrestigeStats"("id") ON DELETE CASCADE ON UPDATE CASCADE;
