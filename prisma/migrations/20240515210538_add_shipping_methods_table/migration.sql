/*
  Warnings:

  - Added the required column `option_id` to the `product_categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- ALTER TABLE "product_categories" ADD COLUMN     "option_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "shipping_methods" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "shipping_methods_pkey" PRIMARY KEY ("id")
);
