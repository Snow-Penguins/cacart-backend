import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedShopOrders() {
  const orders = [
    {
      user_id: 5,
      address_id: 1,
      method_id: 1,
      order_total: 19.99,
      status_id: 2,
    },
    {
      user_id: 6,
      address_id: 2,
      method_id: 2,
      order_total: 39.99,
      status_id: 1,
    },
    {
      user_id: 7,
      address_id: 3,
      method_id: 2,
      order_total: 99.99,
      status_id: 1,
    },
  ];

  for (const order of orders) {
    const newOrder = await prisma.shopOrder.create({
      data: {
        ...order,
        order_date: new Date(),
      },
    });

    console.log(
      `Shop Order Created: User ID ${newOrder.user_id} has a total amount of $${newOrder.order_total}`,
    );
  }
}
