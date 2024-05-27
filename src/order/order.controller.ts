import { Controller, Get, Param } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get(':id')
  getOrderById(@Param('id') id: string) {
    try {
      return this.orderService.getOrderById(+id);
    } catch (error) {
      console.log(error);
    }
  }
}
