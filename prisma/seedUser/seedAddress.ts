import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedAddresses() {
  const addresses = [
    {
      address_line1: '123 Maple Street',
      city: 'Calgary',
      province: 'AB',
      postal_code: 'T2P1H9',
    },
    {
      address_line1: '456 Oak Avenue',
      city: 'Calgary',
      province: 'AB',
      postal_code: 'T3P2J4',
    },
    {
      address_line1: '789 Pine Road',
      city: 'Calgary',
      province: 'AB',
      postal_code: 'T4P3K7',
    },
  ];

  for (const address of addresses) {
    const newAddress = await prisma.address.create({
      data: {
        ...address,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    console.log(
      `Address Created: ${newAddress.address_line1} ${newAddress.postal_code}`,
    );
  }
}
