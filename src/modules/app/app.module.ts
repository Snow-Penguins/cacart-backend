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

@Module({
  imports: [PrismaModule, ProductModule],
  controllers: [AppController],
  providers: [AppService, ProductService, PrismaService],
})
export class AppModule {}
