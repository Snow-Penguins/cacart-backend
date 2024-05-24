import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedOrderHistory() {
  const orders = [
    { product_items_id: 1, shop_order_id: 1, qty: 2, price: 19.99 },
    { product_items_id: 2, shop_order_id: 2, qty: 1, price: 39.99 },
    { product_items_id: 3, shop_order_id: 3, qty: 1, price: 99.99 },
  ];

  for (const order of orders) {
    const existingOrder = await prisma.orderHistory.findFirst({
      where: {
        product_items_id: order.product_items_id,
      },
    });

    if (!existingOrder) {
      const newOrderHistory = await prisma.orderHistory.create({
        data: {
          product_items_id: order.product_items_id,
          shop_order_id: order.shop_order_id,
          qty: order.qty,
          price: order.price,
        },
      });
      console.log(
        `Order History Created: ID ${newOrderHistory.id} with quantity ${newOrderHistory.qty}`,
      );
    } else {
      console.log(`Order History already exists: ID ${existingOrder.id}`);
    }
  }
}
