import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class ProductCategoryService {
  constructor(private prisma: PrismaService) {}

  async getMainCategory() {
    return this.prisma.productCategory.findMany({
      where: {
        id: {
          gte: 1, // Id is equal or greater than 1
          lte: 17, // Id is equal or less than 7
        },
      },
    });
  }

  async getOneCategory(id: number) {
    return this.prisma.productCategory.findUnique({
      where: {
        id,
      },
    });
  }
}
