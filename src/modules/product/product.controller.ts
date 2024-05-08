import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAllProducts() {
    try {
      return this.productService.getAllProducts();
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
}
