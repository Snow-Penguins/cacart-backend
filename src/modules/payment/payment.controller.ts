import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-payment-intent')
  async createPaymentIntent(
    @Body() createPaymentDto: { amount: number; currency: string },
  ) {
    const paymentIntent = await this.paymentService.createPaymentIntent(
      createPaymentDto.amount,
      createPaymentDto.currency,
    );
    return { clientSecret: paymentIntent.client_secret };
  }

  @Post('get-cart-items')
  async getCartItems(@Body() getCartItemsDto: { cartId: number }) {
    const cartItems = await this.paymentService.getCartItems(
      getCartItemsDto.cartId,
    );
    return { cartItems };
  }
}
