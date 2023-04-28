import { Product } from "src/product/entities/product.entity";
import { EOrderStatus } from "../enum/order.enum";

export interface IOrder {
    id:number;
    orderStatus: EOrderStatus;
    products: Product[];
}