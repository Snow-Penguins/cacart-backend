import { Module } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { ConfigModule } from '@nestjs/config';
import { SupabaseService } from 'src/modules/supabase/supabase.service';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports: [ConfigModule, UsersModule],
  controllers: [OrderController],
  providers: [OrderService, PrismaService, SupabaseService],
})
export class OrderModule {}
