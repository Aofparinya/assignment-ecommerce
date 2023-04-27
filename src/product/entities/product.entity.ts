import { Order } from 'src/order/entities/order.entity';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    price: string;

    @ManyToMany(() => Order)
    @JoinTable()
    order: Order[]
    
}