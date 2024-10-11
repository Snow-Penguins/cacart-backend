import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { NotFoundException } from '@nestjs/common';

describe('CartController', () => {
  let controller: CartController;
  let service: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [
        {
          provide: CartService,
          useValue: {
            getCartItems: jest.fn(),
            addToCart: jest.fn(),
            updateCartItemQuantity: jest.fn(),
            removeCartItem: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CartController>(CartController);
    service = module.get<CartService>(CartService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getCart', () => {
    it('should return cart items', async () => {
      const cartMock = { id: 1, user_id: 1, cart_items: [] };
      jest.spyOn(service, 'getCartItems').mockResolvedValue(cartMock);

      const result = await controller.getCart('1');
      expect(result).toEqual(cartMock);
      expect(service.getCartItems).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if cart is not found', async () => {
      jest
        .spyOn(service, 'getCartItems')
        .mockRejectedValue(new NotFoundException());

      await expect(controller.getCart('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('addToCart', () => {
    it('should add an item to the cart', async () => {
      const addToCartDto = { productItemId: 1, quantity: 2 };
      const cartMock = { id: 1, user_id: 1, cart_items: [] };
      jest.spyOn(service, 'addToCart').mockResolvedValue(cartMock);

      const result = await controller.addToCart('1', addToCartDto);
      expect(result).toEqual(cartMock);
      expect(service.addToCart).toHaveBeenCalledWith(1, 1, 2);
    });
  });

  describe('updateCartItemQuantity', () => {
    it('should update cart item quantity', async () => {
      const updateCartItemDto = { quantity: 3 };
      const cartItemMock = { id: 1, cart_id: 1, product_item_id: 1, qty: 3 };
      jest
        .spyOn(service, 'updateCartItemQuantity')
        .mockResolvedValue(cartItemMock);

      const result = await controller.updateCartItemQuantity(
        '1',
        updateCartItemDto,
      );
      expect(result.qty).toBe(3);
      expect(service.updateCartItemQuantity).toHaveBeenCalledWith(1, 3);
    });
  });

  describe('removeCartItem', () => {
    it('should remove cart item', async () => {
      jest
        .spyOn(service, 'removeCartItem')
        .mockResolvedValue({ id: 1, cart_id: 1, product_item_id: 1, qty: 1 });

      const result = await controller.removeCartItem('1');
      expect(result).toBeDefined();
      expect(service.removeCartItem).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if cart item is not found', async () => {
      jest
        .spyOn(service, 'removeCartItem')
        .mockRejectedValue(new NotFoundException());

      await expect(controller.removeCartItem('1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
