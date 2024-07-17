import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

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

  @Get('user/:userId')
  getOrdersByUserId(@Param('userId') userId: string) {
    try {
      return this.orderService.getOrdersByUserId(+userId);
    } catch (error) {
      console.log(error);
    }
  }

  @Post('create')
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    try {
      return await this.orderService.createOrder(createOrderDto);
    } catch (error) {
      console.log(error);
    }
  }
}
