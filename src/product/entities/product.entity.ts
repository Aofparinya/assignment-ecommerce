import { Order } from 'src/order/entities/order.entity';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany, ManyToMany, JoinTable, ManyToOne } from 'typeorm';

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    price: number;

    @ManyToOne(() => Order, (order) => order.product)
    order : Order;
}