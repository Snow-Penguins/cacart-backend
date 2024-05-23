import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedOrderStatus() {
  const orderStatus = [
    'Processing',
    'Ready for Pickup',
    'Shipped',
    'Delivered',
    'Picked Up',
  ];

  for (const status of orderStatus) {
    const existingStatus = await prisma.orderStatus.findFirst({
      where: {
        status: status,
      },
    });

    if (!existingStatus) {
      const newStatus = await prisma.orderStatus.create({
        data: {
          status,
        },
      });
      console.log(`User Created: ${newStatus.status}`);
    } else {
      console.log(`User already exists: ${status}`);
    }
  }
}
