import { Module } from '@nestjs/common';
import { ProductCategoryController } from './product-category.controller';
import { ProductCategoryService } from './product-category.service';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { SupabaseService } from '../supabase/supabase.service';

@Module({
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService, PrismaService, SupabaseService],
})
export class ProductCategoryModule {}
