import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAllProducts(@Query('optionId') optionId?: string) {
    try {
      const option_id = optionId ? parseInt(optionId, 10) : undefined;
      return this.productService.getAllProducts(option_id);
    } catch (error) {
      console.log(error);
    }
  }

  @Get('by-date')
  getAllProductsByDate() {
    try {
      return this.productService.getAllProductsByDate();
    } catch (error) {
      console.log(error);
    }
  }

  @Get('sold-qty')
  getAllProductBySoldQty1() {
    try {
      return this.productService.getAllProductsBySoldQty();
    } catch (error) {
      console.log(error);
    }
  }
}
