/*
  Warnings:

  - You are about to drop the column `merchant_name` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `merchant_name` on the `payables` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "merchant_name";

-- AlterTable
ALTER TABLE "payables" DROP COLUMN "merchant_name";
