import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedShippingMethods() {
  const shippingMethods = [
    {
      name: 'Pick up',
      price: 0.0,
    },
    {
      name: 'Delivery',
      price: 8.0,
    },
  ];

  for (const method of shippingMethods) {
    const existingMethod = await prisma.shippingMethod.findFirst({
      where: {
        name: method.name,
      },
    });

    if (!existingMethod) {
      const newMethod = await prisma.shippingMethod.create({
        data: method,
      });
      console.log(`User Created: ${newMethod.name}`);
    } else {
      console.log(`User already exists: ${method.name}`);
    }
  }
}
