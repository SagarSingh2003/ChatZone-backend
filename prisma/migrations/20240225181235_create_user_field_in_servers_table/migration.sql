/*
  Warnings:

  - A unique constraint covering the columns `[server_name]` on the table `Servers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `server_name` to the `Servers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Servers" ADD COLUMN     "server_name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Servers_server_name_key" ON "Servers"("server_name");
