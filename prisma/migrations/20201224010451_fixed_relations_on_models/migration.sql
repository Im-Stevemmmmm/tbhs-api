/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[prestigeStatsId]` on the table `PitData`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PitData_prestigeStatsId_unique" ON "PitData"("prestigeStatsId");
