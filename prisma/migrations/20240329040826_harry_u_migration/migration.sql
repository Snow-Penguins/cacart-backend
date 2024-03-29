/*
  Warnings:

  - You are about to drop the column `productItemId` on the `option_values` table. All the data in the column will be lost.
  - Added the required column `option_id` to the `product_categories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "option_values" DROP CONSTRAINT "option_values_productItemId_fkey";

-- AlterTable
ALTER TABLE "option_values" DROP COLUMN "productItemId";

-- AlterTable
ALTER TABLE "product_categories" ADD COLUMN     "option_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "options" (
    "id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "option_name" VARCHAR(50) NOT NULL,

    CONSTRAINT "options_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "options" ADD CONSTRAINT "options_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "product_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
