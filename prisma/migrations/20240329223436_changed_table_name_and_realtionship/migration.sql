/*
  Warnings:

  - You are about to drop the column `productItemId` on the `option_values` table. All the data in the column will be lost.
  - You are about to drop the `product_options` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `option_id` to the `product_categories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "option_values" DROP CONSTRAINT "option_values_productItemId_fkey";

-- DropForeignKey
ALTER TABLE "product_options" DROP CONSTRAINT "product_options_option_id_fkey";

-- DropForeignKey
ALTER TABLE "product_options" DROP CONSTRAINT "product_options_product_id_fkey";

-- AlterTable
ALTER TABLE "option_values" DROP COLUMN "productItemId";

-- AlterTable
ALTER TABLE "product_categories" ADD COLUMN     "option_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "product_options";

-- CreateTable
CREATE TABLE "options" (
    "id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "option_name" VARCHAR(50) NOT NULL,

    CONSTRAINT "options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_item_option_values" (
    "product_items_id" INTEGER NOT NULL,
    "option_values_id" INTEGER NOT NULL,

    CONSTRAINT "product_item_option_values_pkey" PRIMARY KEY ("product_items_id","option_values_id")
);

-- AddForeignKey
ALTER TABLE "options" ADD CONSTRAINT "options_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "product_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_items" ADD CONSTRAINT "product_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "option_values" ADD CONSTRAINT "option_values_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "options"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_item_option_values" ADD CONSTRAINT "product_item_option_values_product_items_id_fkey" FOREIGN KEY ("product_items_id") REFERENCES "product_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_item_option_values" ADD CONSTRAINT "product_item_option_values_option_values_id_fkey" FOREIGN KEY ("option_values_id") REFERENCES "option_values"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
