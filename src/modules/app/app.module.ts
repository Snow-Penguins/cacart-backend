import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { ProductModule } from '../product/product.module';
import { ProductService } from '../product/product.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PrismaModule, ProductModule],
  controllers: [AppController],
  providers: [AppService, ProductService, PrismaService],
})
export class AppModule {}
