import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getAllProducts() {
    return this.prisma.product.findMany();
  }

  async getAllProductsByDate() {
    return this.prisma.product.findMany({
      select: {
        id: true,
        name: true,
        created_at: true,
        category: {
          select: {
            name: true,
          },
        },
        product_items: {
          select: {
            price: true,
          },
        },
      },
    });
  }
}
