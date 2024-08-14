export class CreateOrderDto {
  userId: number;
  totalAmount: number;
  shippingMethodId: number;
  orderStatusId: number;
  shippingAddress: shippingAddressDto;
  items: {
    productId: number;
    quantity: number;
    price: number;
  }[];
}
class shippingAddressDto {
  id?: number;
  unit_number?: string | null;
  address_line1: string;
  address_line2?: string | null;
  city: string;
  province: string;
  postal_code: string;
  created_at?: string;
  updated_at?: string;
}
