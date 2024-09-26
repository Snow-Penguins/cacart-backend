import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import Decimal from 'decimal.js';

describe('OrderService', () => {
  let service: OrderService;
  let prisma: PrismaService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: PrismaService,
          useValue: {
            shopOrder: {
              findUnique: jest.fn(),
              findMany: jest.fn(),
              create: jest.fn(),
            },
          },
        },
        {
          provide: UsersService,
          useValue: {
            getUserById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    prisma = module.get<PrismaService>(PrismaService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getOrderById', () => {
    it('should return an order by id', async () => {
      const orderMock = {
        id: 1,
        user: {
          first_name: 'John',
          last_name: 'Doe',
          email_address: 'john@example.com',
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
            product_item: {
              product: {
                name: 'Test Product',
                product_image: ['image1.jpg'],
              },
            },
            qty: 2,
            price: new Decimal(50),
          },
        ],
      };
      (prisma.shopOrder.findUnique as jest.Mock).mockResolvedValue(orderMock);

      const result = await service.getOrderById(1);
      expect(result).toEqual(orderMock);
    });

    it('should throw NotFoundException if order is not found', async () => {
      (prisma.shopOrder.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.getOrderById(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getOrdersByUserId', () => {
    it('should return orders by user id', async () => {
      const ordersMock = [
        {
          id: 1,
          user: {
            first_name: 'John',
            last_name: 'Doe',
          },
          order_histories: [
            {
              product_item: {
                product: {
                  name: 'Test Product',
                  product_image: ['image1.jpg'],
                },
              },
              qty: 2,
              price: new Decimal(50),
            },
          ],
        },
      ];
      (usersService.getUserById as jest.Mock).mockResolvedValue(true);
      (prisma.shopOrder.findMany as jest.Mock).mockResolvedValue(ordersMock);

      const result = await service.getOrdersByUserId(1);
      expect(result).toEqual(ordersMock);
    });

    it('should throw NotFoundException if user is not found', async () => {
      (usersService.getUserById as jest.Mock).mockResolvedValue(null);

      await expect(service.getOrdersByUserId(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createOrder', () => {
    it('should create a new order', async () => {
      const createOrderDto: CreateOrderDto = {
        userId: 1,
        totalAmount: new Decimal(100),
        shippingAddress: {
          id: null,
          address_line1: '123 Test St',
          city: 'NY',
          province: 'NY',
          postal_code: '10001',
        },
        items: [{ productId: 1, quantity: 2, price: new Decimal(50) }],
        shippingMethodId: 1,
        orderStatusId: 1,
      };
      const orderMock = {
        id: 1,
        user: {
          id: 1,
          first_name: 'John',
          last_name: 'Doe',
          email_address: 'john@example.com',
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
            product_item: {
              product: {
                name: 'Test Product',
                product_image: ['image1.jpg'],
              },
            },
            qty: 2,
            price: new Decimal(50),
          },
        ],
      };
      (prisma.shopOrder.create as jest.Mock).mockResolvedValue(orderMock);

      const result = await service.createOrder(createOrderDto);
      expect(result).toEqual(orderMock);
    });
  });
});
