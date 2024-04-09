/*
  Warnings:

  - Added the required column `room_id` to the `MessagesReadByMembers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MessagesReadByMembers" ADD COLUMN     "room_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "MessagesReadByMembers" ADD CONSTRAINT "MessagesReadByMembers_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
