import { Test, TestingModule } from '@nestjs/testing';
import { ProductSearchController } from './product-search.controller';
import { ProductSearchService } from './product-search.service';

describe('ProductSearchController', () => {
  let searchController: ProductSearchController;
  let searchService: ProductSearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductSearchController],
      providers: [ProductSearchService],
    }).compile();

    searchController = module.get<ProductSearchController>(
      ProductSearchController,
    );
    searchService = module.get<ProductSearchService>(ProductSearchService);
  });

  describe('product-search', () => {
    it('should return search results', async () => {
      const searchResult = [{ id: 1, name: 'Test Product' }];
      jest
        .spyOn(searchService, 'searchProducts')
        .mockResolvedValue(searchResult);

      expect(await searchController.search('test')).toEqual(searchResult);
    });
  });
});
