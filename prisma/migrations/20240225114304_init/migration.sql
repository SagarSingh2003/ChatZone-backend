/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `server_id` to the `Rooms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Messages" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Rooms" ADD COLUMN     "server_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Servers" (
    "id" SERIAL NOT NULL,
    "server_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Servers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Servers_id_key" ON "Servers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Servers_server_id_key" ON "Servers"("server_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Rooms" ADD CONSTRAINT "Rooms_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "Servers"("server_id") ON DELETE RESTRICT ON UPDATE CASCADE;
