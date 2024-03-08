-- CreateTable
CREATE TABLE "Rooms" (
    "id" SERIAL NOT NULL,
    "room_id" TEXT NOT NULL,

    CONSTRAINT "Rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Moderators" (
    "id" SERIAL NOT NULL,
    "room_id" TEXT NOT NULL,
    "mod_id" INTEGER NOT NULL,

    CONSTRAINT "Moderators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Members" (
    "id" SERIAL NOT NULL,
    "room_id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Messages" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "room_id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Rooms_id_key" ON "Rooms"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Rooms_room_id_key" ON "Rooms"("room_id");

-- CreateIndex
CREATE UNIQUE INDEX "Moderators_id_key" ON "Moderators"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Members_id_key" ON "Members"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Messages_id_key" ON "Messages"("id");

-- AddForeignKey
ALTER TABLE "Moderators" ADD CONSTRAINT "Moderators_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Rooms"("room_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Moderators" ADD CONSTRAINT "Moderators_mod_id_fkey" FOREIGN KEY ("mod_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Members" ADD CONSTRAINT "Members_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Rooms"("room_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Members" ADD CONSTRAINT "Members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Rooms"("room_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
