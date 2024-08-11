import { Test, TestingModule } from '@nestjs/testing';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { PrismaService } from '../prisma/prisma.service';

describe('SearchController', () => {
  let searchController: SearchController;
  let searchService: SearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchController],
      providers: [SearchService, PrismaService],
    }).compile();

    searchController = module.get<SearchController>(SearchController);
    searchService = module.get<SearchService>(SearchService);
  });

  describe('search', () => {
    it('should return an empty array if no query is provided', async () => {
      expect(await searchController.search('')).toEqual([]);
    });

    it('should return search results', async () => {
      const searchResult = [{ id: 1, name: 'Test Product' }];
      jest
        .spyOn(searchService, 'searchProducts')
        .mockResolvedValue(searchResult);

      expect(await searchController.search('test')).toEqual(searchResult);
    });
  });
});
