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
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { ProductCategoryService } from '../product-category/product-category.service';
import { ProductCategoryModule } from '../product-category/product-category.module';
import { ProductCategoryController } from '../product-category/product-category.controller';
import { OrderController } from 'src/order/order.controller';
import { OrderModule } from 'src/order/order.module';
import { OrderService } from 'src/order/order.service';

@Module({
  imports: [
    PrismaModule,
    ProductModule,
    ProductCategoryModule,
    UsersModule,
    AuthModule,
    SupabaseModule,
    OrderModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [
    AppController,
    ProductController,
    ProductCategoryController,
    OrderController,
  ],
  providers: [
    AppService,
    ProductService,
    PrismaService,
    UsersService,
    SupabaseService,
    ProductCategoryService,
    OrderService,
  ],
})
export class AppModule {}
