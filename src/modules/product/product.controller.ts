import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { Param } from '@nestjs/common';

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

  @Get(':id')
  getProductById(@Param('id') id: string) {
    try {
      return this.productService.getProductById(+id);
    } catch (error) {
      console.log(error);
    }
  }
}
