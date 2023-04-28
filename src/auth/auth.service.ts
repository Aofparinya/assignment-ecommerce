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
        private readonly userService: UsersService,
        private jwtService: JwtService
    ) { }

    async register(registerDto: RegisterDto) {
        const user = await this.userService.signUp(registerDto);
        return {
            user
        }
    }

    async login(loginDto: LoginDto) {
        const username = loginDto.username;
        const user = await this.userService.findOneUser(username);

        const result = await this.validateUser(loginDto.username, loginDto.password)
        return result

    }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOneUser(username)
        const match = await bcrypt.compare(password, user.password)

        if (match) {
            const { password, ...result } = user
            const payload = { name: user.lastname, sub: user.id };
            return {
                result,
                access_token: this.jwtService.sign(payload)
            };
        } else {
            throw new UnauthorizedException();
        }
    }

}
