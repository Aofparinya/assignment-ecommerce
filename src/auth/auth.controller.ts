import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RegisterDto } from 'src/dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/dto/log-in.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    // register
    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto)
    }
    
    // log-in 
    @Post('log-in')
    login(@Body() LoginDto: LoginDto) {
        return this.authService.login(LoginDto)
    }


}
