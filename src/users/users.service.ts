import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/dto/user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { Observable, map } from 'rxjs';
import { RegisterDto } from 'src/dto/register.dto';
import { error } from 'console';
import { LoginDto } from 'src/dto/log-in.dto';
import { CreateOrderDTO } from 'src/dto/create-order-dto';
import { Order } from 'src/order/entities/order.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private AuthService: AuthService
    ) { }

    private user: UserDto[];


    // view profile 
    viewProfileByUser(username: string) {
        let user = this.userRepository.createQueryBuilder("user")
            .where("user.username = :username", { username: username })
            .getOneOrFail();
        return user;
    }

    // create user || register 
    async createUser(registerDto: RegisterDto) {
        let findUser = await this.userRepository.createQueryBuilder("user")
            .where("user.username =:username", { username: registerDto.username })
            .getOne();

        if (!findUser) {
            const newUser = this.userRepository.create(registerDto);
            return this.userRepository.save(newUser);
        } else {
            return "Has this username in system";
        }
    }

    // log-in
    async login(loginDto: LoginDto) {
        let user = await this.userRepository.createQueryBuilder("user")
            .where("user.username =:username", { username: loginDto.username })
            .andWhere("user.password =:password", { password: loginDto.password })
            .getOne()

        if (user) {
            return user;
        } else {
            return "No user in system";
        }

    }

    // create order 
    async createOrder(createOrderDto: CreateOrderDTO) {
        let user = await this.userRepository.createQueryBuilder("user")
            .where("user.id =:id", { id: createOrderDto.userId })
            .getOne()
        console.log(user);
    }

    // view order history

}

