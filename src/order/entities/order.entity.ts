import { join } from 'path';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany, ManyToOne, ManyToMany , JoinTable} from 'typeorm';

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    orderStatus:string;

    @ManyToOne(() => User, (user) => user.username)
    user: User

    /*
    @ManyToMany(() => Product)
    @JoinTable()
    product: Product[]
    */
}