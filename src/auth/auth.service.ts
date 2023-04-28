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
        const token = await this.createToken(loginDto);
        return {
            result, token
        }

    }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOneUser(username)
        const match = await bcrypt.compare(password, user.password)

        if (match) {
            const { password, ...result } = user
            const payload = { name: user.lastname, sub: user.id };
            return {
                result,
            };
        } else {
            throw new UnauthorizedException();
        }
    }
    private async createToken(loginDto: LoginDto) {
        const username = loginDto.username;
        const user = await this.userService.findOneUser(username);
        const payload = { name: user.lastname, sub: user.id };
        const token = this.jwtService.sign(payload);
        return {
            expiresIn: '60s',
            token
        }

    }

}
