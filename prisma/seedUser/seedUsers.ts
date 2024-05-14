import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedUsers() {
  const users = [
    {
      email_address: 'john.doe@example.com',
      phone_number: '1234567890',
      password: 'Password123',
      firstname: 'John',
      middlename: 'Quincy',
      lastname: 'Doe',
      source_id: 0,
    },
    {
      email_address: 'jane.doe@example.com',
      phone_number: '0987654321',
      password: 'Password123',
      firstname: 'Jane',
      middlename: 'Quinn',
      lastname: 'Doe',
      source_id: 0,
    },
    {
      email_address: 'jim.doe@example.com',
      phone_number: '5678901234',
      password: 'Password123',
      firstname: 'Jim',
      middlename: 'Quantum',
      lastname: 'Doe',
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
      console.log(`User Created: ${newUser.firstname} ${newUser.lastname}`);
    } else {
      console.log(`User already exists: ${user.firstname} ${user.lastname}`);
    }
  }
}
