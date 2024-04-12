import { Module } from '@nestjs/common';
import { ConfigModule,  } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { ProductController } from '../product/product.controller';
import { ProductModule } from '../product/product.module';
import { ProductService } from '../product/product.service';
import { SupabaseModule } from '../supabase/supabase.module';
import { SupabaseService } from '../supabase/supabase.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';



@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true,
  }), PrismaModule, ProductModule, SupabaseModule],
  controllers: [AppController, ProductController],
  providers: [AppService, ProductService, PrismaService, SupabaseService],
})
export class AppModule {}
