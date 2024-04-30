import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SupabaseService } from '../supabase/supabase.service';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { SupabaseModule } from '../supabase/supabase.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [SupabaseModule, ConfigModule],
  controllers: [ProductController],
  providers: [ProductService, PrismaService, SupabaseService],
})
export class ProductModule {}
