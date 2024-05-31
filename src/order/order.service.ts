import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async getOrderById(id: number) {
    return this.prisma.shopOrder.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            first_name: true,
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
}
