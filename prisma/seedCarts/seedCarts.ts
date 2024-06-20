import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedCarts() {
  const carts = [
    {
      user_id: 5,
      cart_items: [
        {
          product_item_id: 1,
          qty: 2,
        },
        {
          product_item_id: 2,
          qty: 1,
        },
      ],
    },
    {
      user_id: 6,
      cart_items: [
        {
          product_item_id: 3,
          qty: 1,
        },
      ],
    },
  ];

  for (const cart of carts) {
    const existingCart = await prisma.cart.findFirst({
      where: {
        user_id: cart.user_id,
      },
      include: {
        cart_items: true,
      },
    });

    if (!existingCart) {
      await prisma.cart.create({
        data: {
          user_id: cart.user_id,
          cart_items: {
            create: cart.cart_items,
          },
        },
      });
      console.log(`Cart Created for User ID: ${cart.user_id}`);
    } else {
      for (const newItem of cart.cart_items) {
        const existingItem = existingCart.cart_items.find(
          (item) => item.product_item_id === newItem.product_item_id,
        );

        if (existingItem) {
          await prisma.cartItem.update({
            where: { id: existingItem.id },
            data: { qty: existingItem.qty + newItem.qty },
          });
        } else {
          await prisma.cartItem.create({
            data: {
              cart_id: existingCart.id,
              product_item_id: newItem.product_item_id,
              qty: newItem.qty,
            },
          });
        }
      }
      console.log(`Cart updated for User ID: ${cart.user_id}`);
    }
  }
}
