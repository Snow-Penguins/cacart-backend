export class CreateOrderDto {
  userId: number;
  totalAmount: number;
  shippingMethodId: number;
  orderStatusId: number;
  shippingAddress: {
    address_line1: string;
    city: string;
    province: string;
    postal_code: string;
  };
  items: {
    productId: number;
    quantity: number;
    price: number;
  }[];
}
