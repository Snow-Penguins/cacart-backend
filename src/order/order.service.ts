import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}

  async getOrderById(id: number) {
    return this.prisma.shopOrder.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            first_name: true,
            last_name: true,
            email_address: true,
          },
        },
        shipping_address: true,
        order_histories: {
          select: {
            qty: true,
            price: true,
            product_item: {
              include: {
                product: {
                  select: {
                    name: true,
                    product_image: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async getOrdersByUserId(userId: number) {
    const user = await this.usersService.getUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.prisma.shopOrder.findMany({
      where: { user_id: userId },
      include: {
        user: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
        order_histories: {
          select: {
            qty: true,
            price: true,
            product_item: {
              include: {
                product: {
                  select: {
                    name: true,
                    product_image: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }
}
