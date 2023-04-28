import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDTO {
    id:number;
    orderStatus: string;
}
