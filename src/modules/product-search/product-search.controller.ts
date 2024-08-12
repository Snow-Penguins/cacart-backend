import {
  Controller,
  Get,
  Query,
  InternalServerErrorException,
} from '@nestjs/common';
import { ProductSearchService } from './product-search.service';

@Controller('product-search')
export class ProductSearchController {
  constructor(private readonly productSearchService: ProductSearchService) {}

  @Get()
  async search(@Query('q') query: string) {
    try {
      return await this.productSearchService.searchProducts(query);
    } catch (error) {
      throw new InternalServerErrorException('Failed to search products');
    }
  }
}
