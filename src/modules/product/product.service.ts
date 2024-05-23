import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getAllProducts() {
    return this.prisma.product.findMany({
      include: {
        category: true,
        product_items: {
          include: {
            option_values: {
              include: {
                option_value: true,
              },
            },
            order_histories: {
              include: {
                user_reviews: {
                  include: {
                    user: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async getProductById(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        category: {
          include: {
            options: true,
          },
        },
        product_items: {
          include: {
            option_values: {
              include: {
                option_value: true,
              },
            },
            order_histories: {
              include: {
                user_reviews: {
                  include: {
                    user: true,
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
