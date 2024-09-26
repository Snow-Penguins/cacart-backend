import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getCartItems(cartId: number) {
    const cart = await this.prisma.cart.findUnique({
      where: { id: cartId },
      include: {
        cart_items: {
          include: {
            product_item: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    return cart;
  }

  async addToCart(userId: number, productItemId: number, quantity: number) {
    let cart = await this.prisma.cart.findFirst({
      where: { user_id: userId },
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: {
          user_id: userId,
        },
      });
    }

    const cartItem = await this.prisma.cartItem.findFirst({
      where: {
        cart_id: cart.id,
        product_item_id: productItemId,
      },
    });

    if (cartItem) {
      await this.prisma.cartItem.update({
        where: { id: cartItem.id },
        data: { qty: cartItem.qty + quantity },
      });
    } else {
      await this.prisma.cartItem.create({
        data: {
          cart_id: cart.id,
          product_item_id: productItemId,
          qty: quantity,
        },
      });
    }

    return this.getCartItems(cart.id);
  }

  async updateCartItemQuantity(cartItemId: number, quantity: number) {
    if (quantity === null || quantity === undefined) {
      throw new Error('Quantity must be provided and cannot be null');
    }

    const cartItem = await this.prisma.cartItem.findUnique({
      where: { id: cartItemId },
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    return this.prisma.cartItem.update({
      where: { id: cartItemId },
      data: { qty: quantity },
    });
  }

  async removeCartItem(cartItemId: number) {
    const cartItem = await this.prisma.cartItem.findUnique({
      where: { id: cartItemId },
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    return this.prisma.cartItem.delete({
      where: { id: cartItemId },
    });
  }
}
