import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import Decimal from 'decimal.js';
import { PaymentIntent } from '../../config/stripe.config';

describe('PaymentController', () => {
  let paymentController: PaymentController;
  let paymentService: PaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [
        {
          provide: PaymentService,
          useValue: {
            createPaymentIntent: jest.fn(),
            getCartItems: jest.fn(),
          },
        },
      ],
    }).compile();

    paymentController = module.get<PaymentController>(PaymentController);
    paymentService = module.get<PaymentService>(PaymentService);
  });

  describe('createPaymentIntent', () => {
    it('should create a payment intent and return client secret', async () => {
      const paymentIntentMock: PaymentIntent = {
        id: 'pi_test',
        amount: 1000,
        currency: 'usd',
        client_secret: 'test_secret',
      } as PaymentIntent;

      const createPaymentDto = { amount: 1000, currency: 'usd' };

      jest.spyOn(paymentService, 'createPaymentIntent').mockResolvedValue({
        ...paymentIntentMock,
        lastResponse: { headers: {}, requestId: '', statusCode: 200 },
      });

      const result =
        await paymentController.createPaymentIntent(createPaymentDto);
      expect(result).toEqual({ clientSecret: 'test_secret' });
    });
  });

  describe('getCartItems', () => {
    it('should return cart items for a given cartId', async () => {
      const cartItemsMock = [
        {
          id: 1,
          cart_id: 1,
          product_item_id: 1,
          qty: 2,
          product_item: {
            id: 1,
            product_id: 1,
            SKU: 'SKU123',
            qty_in_stock: 100,
            qty_sold: 10,
            price: new Decimal(50),
            created_at: new Date(),
            updated_at: new Date(),
            product: {
              id: 1,
              category_id: 1,
              name: 'Test Product',
              description: 'Product description',
              product_image: ['image1.jpg'],
              created_at: new Date(),
              updated_at: new Date(),
            },
          },
        },
      ];

      const getCartItemsDto = { cartId: 1 };

      jest
        .spyOn(paymentService, 'getCartItems')
        .mockResolvedValue(cartItemsMock);

      const result = await paymentController.getCartItems(getCartItemsDto);
      expect(result).toEqual({ cartItems: cartItemsMock });
    });
  });
});
