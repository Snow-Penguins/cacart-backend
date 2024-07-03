import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':cartId')
  async getCart(@Param('cartId') cartId: string) {
    const id = parseInt(cartId);
    try {
      return await this.cartService.getCartItems(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Cart not found');
      }
      throw error;
    }
  }

  @Patch('item/:cartItemId')
  async updateCartItemQuantity(
    @Param('cartItemId') cartItemId: string,
    @Body() updateCartItemDto: { quantity: number },
  ) {
    const id = parseInt(cartItemId);
    return this.cartService.updateCartItemQuantity(
      id,
      updateCartItemDto.quantity,
    );
  }

  @Post(':userId/add')
  async addToCart(
    @Param('userId') userId: string,
    @Body() addToCartDto: { productItemId: number; quantity: number },
  ) {
    const id = parseInt(userId);
    return this.cartService.addToCart(
      id,
      addToCartDto.productItemId,
      addToCartDto.quantity,
    );
  }

  @Delete('item/:cartItemId')
  async removeCartItem(@Param('cartItemId') cartItemId: string) {
    const id = parseInt(cartItemId);
    return this.cartService.removeCartItem(id);
  }
}
