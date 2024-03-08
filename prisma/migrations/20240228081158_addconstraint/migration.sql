/*
  Warnings:

  - You are about to drop the column `room_id` on the `Members` table. All the data in the column will be lost.
  - Added the required column `server_id` to the `Members` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Members" DROP CONSTRAINT "Members_room_id_fkey";

-- AlterTable
ALTER TABLE "Members" DROP COLUMN "room_id",
ADD COLUMN     "server_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Members" ADD CONSTRAINT "Members_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "Rooms"("room_id") ON DELETE RESTRICT ON UPDATE CASCADE;
