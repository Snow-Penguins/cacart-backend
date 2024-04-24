import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getAllProducts() {
    return this.prisma.product.findMany({
      include: {
        category: true,
        product_items: true,
      },
    });
  }

  async getProductById(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        product_items: {
          include: {
            option_values: {
              include: {
                option_value: {
                  select: {
                    value: true,
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
