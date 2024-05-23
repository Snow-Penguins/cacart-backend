/*
  Warnings:

  - Added the required column `option_id` to the `product_categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- ALTER TABLE "product_categories" ADD COLUMN     "option_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "order_history" (
    "id" SERIAL NOT NULL,
    "product_items_id" INTEGER NOT NULL,
    "shop_order_id" INTEGER,
    "qty" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "order_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_reviews" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "order_history_id" INTEGER NOT NULL,
    "rating_value" INTEGER NOT NULL,
    "comment" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "review_image1" TEXT,
    "review_image2" TEXT,
    "review_image3" TEXT,
    "review_image4" TEXT,
    "review_image5" TEXT,

    CONSTRAINT "user_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
-- CREATE TABLE "users" (
--     "id" SERIAL NOT NULL,
--     "email_address" VARCHAR(50) NOT NULL,
--     "phone_number" VARCHAR(10),
--     "password" VARCHAR(100) NOT NULL,
--     "firstname" VARCHAR(25) NOT NULL,
--     "middlename" VARCHAR(25),
--     "lastname" VARCHAR(25) NOT NULL,
--     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     "updated_at" TIMESTAMP(3) NOT NULL,
--     "source_id" INTEGER,

--     CONSTRAINT "users_pkey" PRIMARY KEY ("id")
-- );

-- CreateIndex
CREATE UNIQUE INDEX "users_email_address_key" ON "users"("email_address");

-- AddForeignKey
ALTER TABLE "order_history" ADD CONSTRAINT "order_history_product_items_id_fkey" FOREIGN KEY ("product_items_id") REFERENCES "product_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_reviews" ADD CONSTRAINT "user_reviews_order_history_id_fkey" FOREIGN KEY ("order_history_id") REFERENCES "order_history"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_reviews" ADD CONSTRAINT "user_reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
