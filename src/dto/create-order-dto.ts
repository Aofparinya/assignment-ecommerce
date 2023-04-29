import { ApiProperty } from "@nestjs/swagger";
import { Product } from "src/product/entities/product.entity";

export class CreateOrderDTO {
    id:number;
    userId:number;
    orderStatus:string
    product:Product;
}
