import { Inject, Injectable, UnauthorizedException, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from, of } from 'rxjs';
import { LoginDto } from 'src/dto/log-in.dto';
import { RegisterDto } from 'src/dto/register.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly userService : UsersService
    ) { }

    async register(registerDto: RegisterDto) {
        const user = await this.userService.signUp(registerDto);
        return {
            user
        }
    }

    async login(loginDto: LoginDto) {
        const user =await this.userService.findOne(loginDto);
        const match = await bcrypt.compare(loginDto.password, user.password)
        
        if (match) {
            return user;
        }else {
            throw new UnauthorizedException();
        }
    }

    async validateUser(username: string, password: string): Promise<any> {
    }

}
