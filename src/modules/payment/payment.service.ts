import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { stripe } from '../../config/stripe.config';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  async getCartItems(cartId: number) {
    const cartItems = await this.prisma.cartItem.findMany({
      where: { cart_id: cartId },
      include: { product_item: { include: { product: true } } },
    });

    return cartItems;
  }

  async createPaymentIntent(amount: number, currency: string) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
    });

    return paymentIntent;
  }
}
