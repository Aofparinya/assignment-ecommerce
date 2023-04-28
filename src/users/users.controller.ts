import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from './users.service';
import { RegisterDto } from 'src/dto/register.dto';
import { LoginDto } from 'src/dto/log-in.dto';
import { CreateOrderDTO } from 'src/dto/create-order-dto';


@ApiTags('Users Management')
@Controller('users')
export class UsersController {

    constructor(
        private authService: AuthService,
        private userService: UsersService
    ) { }

    // view profile
    @Get('viewProfile')
    viewProfile(@Query('username') username: string) {
        return this.userService.viewProfileByUser(username);
    }

    @Post('create-order') 
    createOrder(@Body() createIrderDto : CreateOrderDTO) {
        return this.userService.createOrder(createIrderDto);
    }


    // view order history 
    @Get('get-speific-order/:userId') 
    viewOrderHistory(@Param('userId') userId : string) {
        return this.userService.viewOrderHistory(Number(userId));
    }

}


