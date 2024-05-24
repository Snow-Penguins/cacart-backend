import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedUsers() {
  const users = [
    {
      email_address: 'john.doe@example.com',
      phone_number: '1234567890',
      password: 'Password123',
      first_name: 'John',
      middle_name: 'Quincy',
      last_name: 'Doe',
      source_id: 0,
    },
    {
      email_address: 'jane.doe@example.com',
      phone_number: '0987654321',
      password: 'Password123',
      first_name: 'Jane',
      middle_name: 'Quinn',
      last_name: 'Doe',
      source_id: 0,
    },
    {
      email_address: 'jim.doe@example.com',
      phone_number: '5678901234',
      password: 'Password123',
      first_name: 'Jim',
      middle_name: 'Quantum',
      last_name: 'Doe',
      source_id: 0,
    },
  ];

  for (const user of users) {
    const existingUser = await prisma.user.findFirst({
      where: {
        email_address: user.email_address,
      },
    });

    if (!existingUser) {
      const newUser = await prisma.user.create({
        data: {
          ...user,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });
      console.log(`User Created: ${newUser.first_name} ${newUser.last_name}`);
    } else {
      console.log(`User already exists: ${user.first_name} ${user.last_name}`);
    }
  }
}
