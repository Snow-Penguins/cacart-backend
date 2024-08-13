import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductSearchService {
  constructor(private prisma: PrismaService) {}

  async searchProducts(query: string): Promise<{ id: number; name: string }[]> {
    return this.prisma.product.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        name: true,
      },
    });
  }
}
