import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getAllProducts() {
    return this.prisma.product.findMany({
      include: {
        category: {
          select: {
            name: true,
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
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async getAllProductsBySoldQty() {
    const products = await this.prisma.product.findMany({
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
            qty_sold: true,
          },
        },
      },
    });

    // Compute total quantities sold per product
    const productsWithTotalSold = products.map((product) => ({
      ...product,
      total_sold: product.product_items.reduce(
        (sum, item) => sum + item.qty_sold,
        0,
      ),
    }));

    // Sort products by total quantities sold in descending order
    productsWithTotalSold.sort((a, b) => b.total_sold - a.total_sold);

    return productsWithTotalSold;
  }
}
