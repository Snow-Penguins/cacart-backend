/*
  Warnings:

  - You are about to drop the column `createdAt` on the `product_categories` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `product_categories` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `products` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `product_categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product_categories" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "product_items" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "SKU" VARCHAR(50) NOT NULL,
    "qty_in_stock" INTEGER NOT NULL,
    "qty_sold" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "product_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "option_values" (
    "id" SERIAL NOT NULL,
    "option_id" INTEGER NOT NULL,
    "value" VARCHAR(50) NOT NULL,
    "qty_by_option" INTEGER NOT NULL,
    "productItemId" INTEGER NOT NULL,

    CONSTRAINT "option_values_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_options" (
    "product_id" INTEGER NOT NULL,
    "option_id" INTEGER NOT NULL,

    CONSTRAINT "product_options_pkey" PRIMARY KEY ("product_id","option_id")
);

-- AddForeignKey
ALTER TABLE "option_values" ADD CONSTRAINT "option_values_productItemId_fkey" FOREIGN KEY ("productItemId") REFERENCES "product_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_options" ADD CONSTRAINT "product_options_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_options" ADD CONSTRAINT "product_options_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "option_values"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
