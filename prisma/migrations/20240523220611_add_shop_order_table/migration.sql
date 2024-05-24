/*
  Warnings:

  - Made the column `shop_order_id` on table `order_history` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "order_history" ALTER COLUMN "shop_order_id" SET NOT NULL;

-- CreateTable
CREATE TABLE "shop_orders" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "order_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "address_id" INTEGER NOT NULL,
    "method_id" INTEGER NOT NULL,
    "order_total" DECIMAL(10,2) NOT NULL,
    "status_id" INTEGER NOT NULL,

    CONSTRAINT "shop_orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "order_history" ADD CONSTRAINT "order_history_shop_order_id_fkey" FOREIGN KEY ("shop_order_id") REFERENCES "shop_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_orders" ADD CONSTRAINT "shop_orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_orders" ADD CONSTRAINT "shop_orders_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_orders" ADD CONSTRAINT "shop_orders_method_id_fkey" FOREIGN KEY ("method_id") REFERENCES "shipping_methods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_orders" ADD CONSTRAINT "shop_orders_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "order_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
