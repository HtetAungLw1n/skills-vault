/*
  Warnings:

  - Added the required column `userId` to the `Skill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Skill" ADD COLUMN     "userId" UUID NOT NULL;

-- CreateIndex
CREATE INDEX "Skill_userId_idx" ON "Skill"("userId");
