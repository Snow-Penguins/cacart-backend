import { Module } from '@nestjs/common';
import { ProductSearchController } from './product-search.controller';
import { ProductSearchService } from './product-search.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ProductSearchController],
  providers: [ProductSearchService, PrismaService],
})
export class ProductSearchModule {}
