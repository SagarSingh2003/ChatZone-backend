-- DropForeignKey
ALTER TABLE "Members" DROP CONSTRAINT "Members_server_id_fkey";

-- AddForeignKey
ALTER TABLE "Members" ADD CONSTRAINT "Members_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "Servers"("server_id") ON DELETE RESTRICT ON UPDATE CASCADE;
