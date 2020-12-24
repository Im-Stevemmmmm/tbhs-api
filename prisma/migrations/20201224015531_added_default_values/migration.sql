-- AlterTable
ALTER TABLE "DefensiveStats" ALTER COLUMN "deaths" SET DEFAULT 0,
ALTER COLUMN "damageTaken" SET DEFAULT 0,
ALTER COLUMN "meleeDamageTaken" SET DEFAULT 0,
ALTER COLUMN "bowDamageTaken" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "FarmingStats" ALTER COLUMN "wheatFarmed" SET DEFAULT 0,
ALTER COLUMN "fishedAnything" SET DEFAULT 0,
ALTER COLUMN "fishedFish" SET DEFAULT 0,
ALTER COLUMN "fishSold" SET DEFAULT 0,
ALTER COLUMN "hayBalesSold" SET DEFAULT 0,
ALTER COLUMN "kingsQuestCompleted" SET DEFAULT 0,
ALTER COLUMN "sewerTreasuresFound" SET DEFAULT 0,
ALTER COLUMN "nightQuestsCompleted" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "MiscellaneousStats" ALTER COLUMN "playtime" SET DEFAULT 0,
ALTER COLUMN "leftClicks" SET DEFAULT 0,
ALTER COLUMN "diamondItemsPurchased" SET DEFAULT 0,
ALTER COLUMN "chatMessages" SET DEFAULT 0,
ALTER COLUMN "blocksPlaced" SET DEFAULT 0,
ALTER COLUMN "blocksBroken" SET DEFAULT 0,
ALTER COLUMN "jumpsIntoPit" SET DEFAULT 0,
ALTER COLUMN "launcherLaunches" SET DEFAULT 0,
ALTER COLUMN "dailyTradeLimits" SET DEFAULT 0,
ALTER COLUMN "goldTradeLimits" SET DEFAULT 0,
ALTER COLUMN "genisisPoints" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "OffensiveStats" ALTER COLUMN "kills" SET DEFAULT 0,
ALTER COLUMN "assists" SET DEFAULT 0,
ALTER COLUMN "swordHits" SET DEFAULT 0,
ALTER COLUMN "arrowsShot" SET DEFAULT 0,
ALTER COLUMN "arrowsHit" SET DEFAULT 0,
ALTER COLUMN "damageDealt" SET DEFAULT 0,
ALTER COLUMN "meleeDamageDealt" SET DEFAULT 0,
ALTER COLUMN "bowDamageDealt" SET DEFAULT 0,
ALTER COLUMN "highestStreak" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "PerformanceStats" ALTER COLUMN "xp" SET DEFAULT 0,
ALTER COLUMN "xpPerHour" SET DEFAULT 0,
ALTER COLUMN "goldEarned" SET DEFAULT 0,
ALTER COLUMN "goldPerHour" SET DEFAULT 0,
ALTER COLUMN "killDeathRatio" SET DEFAULT 0,
ALTER COLUMN "killDeathPlusAssistRatio" SET DEFAULT 0,
ALTER COLUMN "killsAndAssistsPerHour" SET DEFAULT 0,
ALTER COLUMN "damageDealtOverTakenRatio" SET DEFAULT 0,
ALTER COLUMN "bowAccuracy" SET DEFAULT 0,
ALTER COLUMN "contractsStarted" SET DEFAULT 0,
ALTER COLUMN "contractsCompleted" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "PerksAndMysticStats" ALTER COLUMN "goldenApplesEaten" SET DEFAULT 0,
ALTER COLUMN "goldenHeadsEaten" SET DEFAULT 0,
ALTER COLUMN "lavaBucketsEmptied" SET DEFAULT 0,
ALTER COLUMN "fishingRodsLaunched" SET DEFAULT 0,
ALTER COLUMN "soupsDrank" SET DEFAULT 0,
ALTER COLUMN "tierOneMysticsEnchanted" SET DEFAULT 0,
ALTER COLUMN "tierTwoMysticsEnchanted" SET DEFAULT 0,
ALTER COLUMN "tierThreeMysticsEnchanted" SET DEFAULT 0,
ALTER COLUMN "darkPantsEnchanted" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "PrestigeStats" ALTER COLUMN "prestige" SET DEFAULT 0,
ALTER COLUMN "currentRenown" SET DEFAULT 0,
ALTER COLUMN "lifetimeRenown" SET DEFAULT 0,
ALTER COLUMN "renownShopCompletion" SET DEFAULT 0;
