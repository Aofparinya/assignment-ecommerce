import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDTO } from 'src/dto/create-order-dto';
import { OrderService } from './order.service';

@ApiTags('Order Management')
@Controller('order')
export class OrderController {

    constructor(private orderService: OrderService) { }

    // create order
    @Post('create-order')
    createOrder(@Body() createOrderDto: CreateOrderDTO) {
        return this.orderService.createOrder(createOrderDto);
    }

    // get order
    @Get('all-order')
    getAllOrders() {
        return this.orderService.getAllOrders();
    }

    // update order 
    @Put('update-order-status/:orderId')
    cancleOrder(@Param(':id') orderId: string) {
        return this.orderService.cancleOrder(Number(orderId));
    }

    // get specific order
    @Get('specific-order/:orderId')
    getOrderById(@Param(':id') orderId: string) {
        return this.orderService.getOrderById(Number(orderId));
    }
}