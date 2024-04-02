/*
  Warnings:

  - You are about to drop the column `option_id` on the `product_categories` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `option_values` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `options` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `product_item_option_values` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `product_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "option_values" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "options" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "product_categories" DROP COLUMN "option_id";

-- AlterTable
ALTER TABLE "product_item_option_values" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "product_items" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
