-- CreateTable
CREATE TABLE "MessagesReadByMembers" (
    "id" SERIAL NOT NULL,
    "message_id" INTEGER NOT NULL,
    "server_id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "MessagesReadByMembers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MessagesReadByMembers_id_key" ON "MessagesReadByMembers"("id");

-- AddForeignKey
ALTER TABLE "MessagesReadByMembers" ADD CONSTRAINT "MessagesReadByMembers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessagesReadByMembers" ADD CONSTRAINT "MessagesReadByMembers_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "Servers"("server_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessagesReadByMembers" ADD CONSTRAINT "MessagesReadByMembers_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "Messages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
