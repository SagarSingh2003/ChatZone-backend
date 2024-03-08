/*
  Warnings:

  - A unique constraint covering the columns `[room_name]` on the table `Rooms` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Rooms_room_name_key" ON "Rooms"("room_name");
