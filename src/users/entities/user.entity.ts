import { Order } from 'src/order/entities/order.entity';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    firstname:string

    @Column()
    lastname:string

    @Column({unique :true})
    email: string;

    @Column()
    password: string;

    @BeforeInsert()
    emailToLowerCase() {
        this.email = this.email.toLowerCase();
    }

    @OneToMany(() => Order, (order) => order.user)
    order: Order
}