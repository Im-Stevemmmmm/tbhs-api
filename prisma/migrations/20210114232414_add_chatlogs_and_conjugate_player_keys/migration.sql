-- CreateTable
CREATE TABLE "PitDefensiveStats" (
"id" SERIAL,
    "playerUuid" TEXT NOT NULL,
    "deaths" INTEGER NOT NULL DEFAULT 0,
    "damageTaken" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "meleeDamageTaken" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "bowDamageTaken" DECIMAL(65,30) NOT NULL DEFAULT 0,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PitFarmingStats" (
"id" SERIAL,
    "playerUuid" TEXT NOT NULL,
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
CREATE TABLE "PitMiscellaneousStats" (
"id" SERIAL,
    "playerUuid" TEXT NOT NULL,
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
CREATE TABLE "PitOffensiveStats" (
"id" SERIAL,
    "playerUuid" TEXT NOT NULL,
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
CREATE TABLE "PitPerformanceStats" (
"id" SERIAL,
    "playerUuid" TEXT NOT NULL,
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
CREATE TABLE "PitPerksAndMysticStats" (
"id" SERIAL,
    "playerUuid" TEXT NOT NULL,
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
CREATE TABLE "PitPrestigeStats" (
"id" SERIAL,
    "playerUuid" TEXT NOT NULL,
    "prestige" INTEGER NOT NULL DEFAULT 0,
    "currentRenown" INTEGER NOT NULL DEFAULT 0,
    "lifetimeRenown" INTEGER NOT NULL DEFAULT 0,
    "renownShopCompletion" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" INTEGER NOT NULL,
    "uuid" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatLog" (
"id" SERIAL,
    "playerUuid" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PitDefensiveStats_playerUuid_unique" ON "PitDefensiveStats"("playerUuid");

-- CreateIndex
CREATE UNIQUE INDEX "PitFarmingStats_playerUuid_unique" ON "PitFarmingStats"("playerUuid");

-- CreateIndex
CREATE UNIQUE INDEX "PitMiscellaneousStats_playerUuid_unique" ON "PitMiscellaneousStats"("playerUuid");

-- CreateIndex
CREATE UNIQUE INDEX "PitOffensiveStats_playerUuid_unique" ON "PitOffensiveStats"("playerUuid");

-- CreateIndex
CREATE UNIQUE INDEX "PitPerformanceStats_playerUuid_unique" ON "PitPerformanceStats"("playerUuid");

-- CreateIndex
CREATE UNIQUE INDEX "PitPerksAndMysticStats_playerUuid_unique" ON "PitPerksAndMysticStats"("playerUuid");

-- CreateIndex
CREATE UNIQUE INDEX "PitPrestigeStats_playerUuid_unique" ON "PitPrestigeStats"("playerUuid");

-- CreateIndex
CREATE UNIQUE INDEX "Player.uuid_unique" ON "Player"("uuid");

-- AddForeignKey
ALTER TABLE "PitDefensiveStats" ADD FOREIGN KEY("playerUuid")REFERENCES "Player"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PitFarmingStats" ADD FOREIGN KEY("playerUuid")REFERENCES "Player"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PitMiscellaneousStats" ADD FOREIGN KEY("playerUuid")REFERENCES "Player"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PitOffensiveStats" ADD FOREIGN KEY("playerUuid")REFERENCES "Player"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PitPerformanceStats" ADD FOREIGN KEY("playerUuid")REFERENCES "Player"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PitPerksAndMysticStats" ADD FOREIGN KEY("playerUuid")REFERENCES "Player"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PitPrestigeStats" ADD FOREIGN KEY("playerUuid")REFERENCES "Player"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatLog" ADD FOREIGN KEY("playerUuid")REFERENCES "Player"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
