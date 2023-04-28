import { Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { UsersService } from 'src/users/users.service';

@ApiTags('Order Management')
@Controller('order')
export class OrderController {

    // create order
    @Post()
    createOrder() {
        
    }

    // cancle order
    @Put()
    cancleOrder(){
        
    }

    // view order details
    @Get()
    viewAllOrder(){

    }

    @Get('order/:id')
    viewOrderById(@Param() id: string) {
        
    }
    

}
