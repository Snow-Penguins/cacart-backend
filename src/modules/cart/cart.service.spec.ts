import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('CartService', () => {
  let service: CartService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        {
          provide: PrismaService,
          useValue: {
            cart: {
              findUnique: jest.fn(),
              findFirst: jest.fn(),
              create: jest.fn(),
            },
            cartItem: {
              findFirst: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              create: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CartService>(CartService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCartItems', () => {
    it('should return cart items', async () => {
      const cartMock = { id: 1, user_id: 1, cart_items: [] };
      (prisma.cart.findUnique as jest.Mock).mockResolvedValue(cartMock);

      const result = await service.getCartItems(1);
      expect(result).toEqual(cartMock);
    });

    it('should throw NotFoundException if cart is not found', async () => {
      (prisma.cart.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.getCartItems(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('addToCart', () => {
    it('should add a new item to the cart when cart exists', async () => {
      const cartMock = { id: 1, user_id: 1, cart_items: [] };

      (prisma.cart.findFirst as jest.Mock).mockResolvedValue(cartMock);
      (prisma.cartItem.findFirst as jest.Mock).mockResolvedValue(null);
      (prisma.cartItem.create as jest.Mock).mockResolvedValue({});

      jest
        .spyOn(service, 'getCartItems')
        .mockResolvedValue({ ...cartMock, user_id: 1 });

      await service.addToCart(1, 1, 2);
      expect(prisma.cartItem.create).toHaveBeenCalled();
    });

    it('should create a new cart and add item when cart does not exist', async () => {
      const cartMock = { id: 1, cart_items: [] };

      (prisma.cart.findFirst as jest.Mock).mockResolvedValue(null);
      (prisma.cart.create as jest.Mock).mockResolvedValue(cartMock);
      (prisma.cartItem.create as jest.Mock).mockResolvedValue({});

      jest
        .spyOn(service, 'getCartItems')
        .mockResolvedValue({ ...cartMock, user_id: 1 });

      await service.addToCart(1, 1, 2);
      expect(prisma.cart.create).toHaveBeenCalled();
      expect(prisma.cartItem.create).toHaveBeenCalled();
    });
  });

  describe('updateCartItemQuantity', () => {
    it('should successfully update the quantity of an existing cart item', async () => {
      const cartItemMock = { id: 1, qty: 2 };
      (prisma.cartItem.findUnique as jest.Mock).mockResolvedValue(cartItemMock);
      (prisma.cartItem.update as jest.Mock).mockResolvedValue({
        ...cartItemMock,
        qty: 3,
      });

      const result = await service.updateCartItemQuantity(1, 3);
      expect(result.qty).toBe(3);
      expect(prisma.cartItem.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { qty: 3 },
      });
    });

    it('should throw NotFoundException if cart item is not found', async () => {
      (prisma.cartItem.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.updateCartItemQuantity(1, 3)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('removeCartItem', () => {
    it('should remove a cart item', async () => {
      (prisma.cartItem.findUnique as jest.Mock).mockResolvedValue({ id: 1 });
      (prisma.cartItem.delete as jest.Mock).mockResolvedValue({});

      await service.removeCartItem(1);
      expect(prisma.cartItem.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException if cart item is not found', async () => {
      (prisma.cartItem.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.removeCartItem(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
