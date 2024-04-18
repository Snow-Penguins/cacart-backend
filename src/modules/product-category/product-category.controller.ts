import { Controller, Get, Param } from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';

@Controller('product-category')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Get()
  getMainCategory() {
    return this.productCategoryService.getMainCategory();
  }

  @Get(':id')
  getOneCategory(@Param('id') id: string) {
    return this.productCategoryService.getOneCategory(+id);
  }
}
