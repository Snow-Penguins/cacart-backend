import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Prisma } from '@prisma/client';
@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}

  async getOrderById(id: number) {
    const order = await this.prisma.shopOrder.findUnique({
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
          include: {
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

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
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
          include: {
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

  async createOrder(createOrderDto: CreateOrderDto) {
    const {
      userId,
      totalAmount,
      shippingAddress,
      items,
      shippingMethodId,
      orderStatusId,
    } = createOrderDto;

    let addressData:
      | { connect: { id: number } }
      | { create: Prisma.AddressCreateInput };

    if (shippingAddress.id) {
      addressData = {
        connect: { id: shippingAddress.id },
      };
    } else {
      addressData = {
        create: shippingAddress,
      };
    }

    const newOrder = await this.prisma.shopOrder.create({
      data: {
        user: {
          connect: { id: userId },
        },
        order_total: totalAmount,
        shipping_method: {
          connect: { id: shippingMethodId },
        },
        order_status: {
          connect: { id: orderStatusId },
        },
        shipping_address: addressData,
        order_histories: {
          create: items.map((item) => ({
            product_item: {
              connect: { id: item.productId },
            },
            qty: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        order_histories: {
          include: {
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
        shipping_address: true,
        user: true,
      },
    });

    return newOrder;
  }
}
