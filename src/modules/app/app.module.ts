import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { ProductController } from '../product/product.controller';
import { ProductModule } from '../product/product.module';
import { ProductService } from '../product/product.service';
import { SupabaseModule } from '../supabase/supabase.module';
import { SupabaseService } from '../supabase/supabase.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductCategoryService } from '../product-category/product-category.service';
import { ProductCategoryModule } from '../product-category/product-category.module';
import { ProductCategoryController } from '../product-category/product-category.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    ProductModule,
    ProductCategoryModule,
    SupabaseModule,
  ],
  controllers: [AppController, ProductController, ProductCategoryController],
  providers: [
    AppService,
    ProductService,
    ProductCategoryService,
    PrismaService,
    SupabaseService,
  ],
})
export class AppModule {}
