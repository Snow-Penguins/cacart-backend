import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';
import { PrismaService } from '../prisma/prisma.service';
import { stripe } from '../../config/stripe.config';

jest.mock('../../config/stripe.config');

describe('PaymentService', () => {
  let paymentService: PaymentService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        {
          provide: PrismaService,
          useValue: {
            cartItem: {
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    paymentService = module.get<PaymentService>(PaymentService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('createPaymentIntent', () => {
    it('should create a payment intent and return it', async () => {
      const paymentIntentMock = { id: 'pi_test', client_secret: 'test_secret' };

      (stripe.paymentIntents.create as jest.Mock).mockResolvedValue(
        paymentIntentMock,
      );

      const result = await paymentService.createPaymentIntent(1000, 'usd');
      expect(result).toEqual(paymentIntentMock);
      expect(stripe.paymentIntents.create).toHaveBeenCalledWith({
        amount: 1000,
        currency: 'usd',
      });
    });
  });

  describe('getCartItems', () => {
    it('should return cart items for a given cart ID', async () => {
      const cartItemsMock = [
        { id: 1, product_item: { product: { name: 'Test Product' } } },
      ];

      (prisma.cartItem.findMany as jest.Mock).mockResolvedValue(cartItemsMock);

      const result = await paymentService.getCartItems(1);
      expect(result).toEqual(cartItemsMock);
      expect(prisma.cartItem.findMany).toHaveBeenCalledWith({
        where: { cart_id: 1 },
        include: { product_item: { include: { product: true } } },
      });
    });
  });
});
