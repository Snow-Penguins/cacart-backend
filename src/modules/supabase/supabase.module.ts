import { Module } from '@nestjs/common';
import { ConfigModule,  } from '@nestjs/config';
import { SupabaseService } from './supabase.service';

@Module({
  imports: [ConfigModule],
  providers: [SupabaseService]
})
export class SupabaseModule {}
