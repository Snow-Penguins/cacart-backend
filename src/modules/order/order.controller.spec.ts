import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import Decimal from 'decimal.js';

const createOrderMock = () => ({
  id: 1,
  user_id: 1,
  order_total: new Decimal(100),
  user: {
    id: 1,
    first_name: 'John',
    middle_name: 'M',
    last_name: 'Doe',
    email_address: 'john@example.com',
    phone_number: '1234567890',
    password: 'hashedPassword',
    created_at: new Date(),
    updated_at: new Date(),
    source_id: 1,
  },
  shipping_address: {
    id: 1,
    unit_number: '123',
    address_line1: 'Test Street',
    address_line2: null,
    city: 'NY',
    province: 'NY',
    postal_code: '10001',
    created_at: new Date(),
    updated_at: new Date(),
  },
  order_histories: [
    {
      id: 1,
      product_items_id: 1,
      shop_order_id: 1,
      product_item: {
        id: 1,
        product_id: 1,
        SKU: 'SKU123',
        qty_in_stock: 100,
        qty_sold: 10,
        price: new Decimal(50),
        product: {
          name: 'Test Product',
          product_image: ['image1.jpg'],
        },
        created_at: new Date(),
        updated_at: new Date(),
      },
      qty: 2,
      price: new Decimal(50),
    },
  ],
  order_date: new Date(),
  address_id: 1,
  method_id: 1,
  status_id: 1,
});

describe('OrderController', () => {
  let orderController: OrderController;
  let orderService: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: {
            getOrderById: jest.fn(),
            getOrdersByUserId: jest.fn(),
            createOrder: jest.fn(),
          },
        },
      ],
    }).compile();

    orderController = module.get<OrderController>(OrderController);
    orderService = module.get<OrderService>(OrderService);
  });

  describe('getOrderById', () => {
    it('should return an order by id', async () => {
      const orderMock = createOrderMock();
      jest.spyOn(orderService, 'getOrderById').mockResolvedValue(orderMock);

      expect(await orderController.getOrderById('1')).toEqual(orderMock);
      expect(orderService.getOrderById).toHaveBeenCalledWith(1);
    });
  });

  describe('getOrdersByUserId', () => {
    it('should return orders by user id', async () => {
      const ordersMock = [createOrderMock()];
      jest
        .spyOn(orderService, 'getOrdersByUserId')
        .mockResolvedValue(ordersMock);

      expect(await orderController.getOrdersByUserId('1')).toEqual(ordersMock);
      expect(orderService.getOrdersByUserId).toHaveBeenCalledWith(1);
    });
  });

  describe('createOrder', () => {
    it('should create a new order', async () => {
      const createOrderDto = {
        userId: 1,
        totalAmount: new Decimal(100),
        shippingAddress: {
          address_line1: '123 Test St',
          city: 'NY',
          province: 'NY',
          postal_code: '10001',
        },
        items: [{ productId: 1, quantity: 2, price: new Decimal(50) }],
        shippingMethodId: 1,
        orderStatusId: 1,
      };
      const orderMock = createOrderMock();
      jest.spyOn(orderService, 'createOrder').mockResolvedValue(orderMock);

      expect(await orderController.createOrder(createOrderDto)).toEqual(
        orderMock,
      );
      expect(orderService.createOrder).toHaveBeenCalledWith(createOrderDto);
    });
  });
});
