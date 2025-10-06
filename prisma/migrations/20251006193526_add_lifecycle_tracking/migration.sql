/*
  Warnings:

  - Added the required column `change` to the `customer_lifecycle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customer_lifecycle" ADD COLUMN     "change" TEXT NOT NULL,
ADD COLUMN     "updated_by_id" TEXT;

-- AddForeignKey
ALTER TABLE "customer_lifecycle" ADD CONSTRAINT "customer_lifecycle_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
