import { ConflictException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDTO } from 'src/dto/create-order-dto';
import { ProductService } from 'src/product/product.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class OrderService {

    constructor(
        @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) { }

    // create order
    async createOrder(createOrderDto: CreateOrderDTO) {
        try {
            console.log(createOrderDto)
            let checkOrder = await this.orderRepository.findOne({ where: { id: createOrderDto.id } });
            console.log(checkOrder)

            if (!checkOrder) {
                const order = new Order();
                order.orderStatus = 'creted';
                await this.orderRepository.save(order);
            }
        } catch (e) {
            throw new ConflictException({
                message: ['Has order in system']
            })
        }
    }
    // cancle order
    async cancleOrder(orderId: number) {
        console.log(orderId)
        let findOrder = await this.orderRepository.createQueryBuilder("order")
            .where("order.id =:id", { id: orderId })
            .getOneOrFail();

        let status = "cancled";
        findOrder.orderStatus = status;
        await this.orderRepository.save(findOrder);

        return findOrder;

    }

    // view all orders
    async getAllOrders() {
        let result = await this.orderRepository.createQueryBuilder("order").getMany();
        return result;
    }

    // view order by id
    async getOrderById(orderId: number) {
        let order = await this.orderRepository.createQueryBuilder("order")
            .where("order.id =:id", { id: orderId })
            .getOne();

        if (order) {
            return order;
        } else {
            return {
                message: 'No order in system'
            }
        }
    }









}
