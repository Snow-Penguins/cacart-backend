import { Controller, Get } from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';

@Controller('product-category')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Get()
  getMainCategory() {
    try {
      return this.productCategoryService.getMainCategory();
    } catch (error) {
      console.log(error);
    }
  }
}
