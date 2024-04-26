import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { SupabaseService } from './supabase.service';

describe('SupabaseService', () => {
  let service: SupabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [SupabaseService, ConfigService],
    }).compile();

    service = module.get<SupabaseService>(SupabaseService);
  });

  it('should get bucket lists', async () => {
    // Arrange/Act
    const actual = await service.getProductImageUrls([
      'Tiny Freshwater Pearl Necklace',
    ]);

    // Assert
    expect(actual.length).toBeGreaterThan(0);
  });
});
