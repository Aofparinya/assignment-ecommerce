import { ConflictException, Inject, Injectable, forwardRef } from '@nestjs/common';
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
import { OrderService } from 'src/order/order.service';
import * as bcrypt from 'bcrypt';
import { check } from 'prettier';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    ) { }

    // view profile 
    async viewProfileByUser(username: string): Promise<User | undefined> {
        const user = await this.userRepository.findOne({ where: { username } });
        return user;
    }

    // log-in
    async login(loginDto: LoginDto) {
        const user = await this.userRepository.createQueryBuilder("user")
            .where("user.username =:username", { username: loginDto.username })
            .getOne();

        if (user) {
            return {
                id: user.id,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email
            };
        } else {
            return "No user in system";
        }
    }

    // create order 
    public async createOrder(createOrderDto: CreateOrderDTO) {
        let user = await this.userRepository.createQueryBuilder("user")
            .where("user.id =:id", { id: createOrderDto.userId })
            .getOne()

        // create new order 
        let order = new Order();
        order.orderStatus = "created";
        order.user = user;
        // should in put product here 
        await this.orderRepository.save(order);

        return "user : " + `${user.username} ` + 'just create an order ';

    }

    // create user || register 
    async signUp(registerDto: RegisterDto) {
        try {
            const { username, password, firstname, lastname, email } = registerDto;

            const hashPassword = await bcrypt.hashSync(password, 10);

            let checkEmail = await this.userRepository.createQueryBuilder("user")
                .where("user.email =:email", { email: email })
                .getOne();

            if (!checkEmail) {
                const user = this.userRepository.create({
                    username,
                    password: hashPassword,
                    firstname,
                    lastname,
                    email
                })
                return await this.userRepository.save(user)
            } else {
                return { message: 'Has email in system' };
            }
        } catch (e) {
            throw new ConflictException({
                message: ['Has username in system']
            })
        }
    }

    // view order history
    async viewOrderHistory(userId: number) {
        let user = await this.userRepository.createQueryBuilder("user")
            .where("user.id =:id", { id: userId })
            .getOne()

        let order = await this.orderRepository.createQueryBuilder("order")
            .where("order.userId =:userId", { userId: user.id })
            .getMany();

        return order;
    }

    async findOne(loginDto: LoginDto) {
        let user = await this.userRepository.createQueryBuilder("user")
            .where("user.username =:username", { username: loginDto.username })
            .getOne()
        return user;
    }

    async findOneUser(user: string) {
        let checkUser = await this.userRepository.findOne({ where: { username: user } })
        return checkUser;
    }
}

