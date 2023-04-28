import { EOrderStatus } from "src/order/enum/order.enum";

export class CreateOrderDTO {
    id:number;
    userId:number;
    orderStatus: EOrderStatus;
}
