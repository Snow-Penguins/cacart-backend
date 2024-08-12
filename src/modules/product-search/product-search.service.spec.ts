import { Test, TestingModule } from '@nestjs/testing';
import { ProductSearchService } from './product-search.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ProductSearchService', () => {
  let service: ProductSearchService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductSearchService, PrismaService],
    }).compile();

    service = module.get<ProductSearchService>(ProductSearchService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should return search results', async () => {
    const searchResult = [{ id: 1, name: 'Test Product' }];
    jest
      .spyOn(prisma.product, 'findMany')
      .mockResolvedValue(searchResult as any);

    expect(await service.searchProducts('Test')).toEqual(searchResult);
    expect(prisma.product.findMany).toHaveBeenCalled();
  });
});
