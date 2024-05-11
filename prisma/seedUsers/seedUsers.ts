import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedUsers() {
  const userData = [
    {
      email_address: 'alice@example.com',
      phone_number: '123-456-7890',
      firstname: 'Alice',
      lastname: 'Johnson',
      password: 'securePassword1',
    },
    {
      email_address: 'bob@example.com',
      phone_number: '234-567-8901',
      firstname: 'Bob',
      lastname: 'Smith',
      password: 'securePassword2',
    },
    {
      email_address: 'carol@example.com',
      phone_number: '345-678-9012',
      firstname: 'Carol',
      lastname: 'White',
      password: 'securePassword3',
    },
    {
      email_address: 'dave@example.com',
      phone_number: '456-789-0123',
      firstname: 'Dave',
      lastname: 'Brown',
      password: 'securePassword4',
    },
    {
      email_address: 'eve@example.com',
      phone_number: '567-890-1234',
      firstname: 'Eve',
      lastname: 'Davis',
      password: 'securePassword5',
    },
  ];

  for (const user of userData) {
    await prisma.user.create({
      data: user,
    });
  }

  console.log('Users seeded.');
}

seedUsers();
