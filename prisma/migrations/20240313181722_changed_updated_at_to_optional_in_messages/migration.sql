/*
  Warnings:

  - Added the required column `OfType` to the `Messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Messages" ADD COLUMN     "OfType" TEXT NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;
