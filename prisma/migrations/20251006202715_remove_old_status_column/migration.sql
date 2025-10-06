/*
  Warnings:

  - You are about to drop the column `old_status` on the `customer_lifecycle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "customer_lifecycle" DROP COLUMN "old_status";

-- AddForeignKey
ALTER TABLE "customer_lifecycle" ADD CONSTRAINT "customer_lifecycle_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
