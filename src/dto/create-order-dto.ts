import { ApiProperty } from "@nestjs/swagger";
import { Product } from "src/product/entities/product.entity";
import { User } from "src/users/entities/user.entity";

export class CreateOrderDTO {
    id:number;
    userId:User;
    orderStatus:string
    product:Product;
}
