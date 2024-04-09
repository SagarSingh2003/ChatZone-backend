/*
  Warnings:

  - Made the column `updatedAt` on table `Messages` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Messages" ALTER COLUMN "createdAt" DROP DEFAULT,
ALTER COLUMN "createdAt" SET DATA TYPE TEXT,
ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET DATA TYPE TEXT;
