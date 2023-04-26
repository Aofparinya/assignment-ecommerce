import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from './users.service';


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

    // view order history 


}


