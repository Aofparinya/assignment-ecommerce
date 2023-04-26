import { Injectable } from '@nestjs/common';
import { ProductDto } from 'src/dto/product.dto';

@Injectable()
export class ProductService {

    private products:ProductDto[] = 
    [
        { name: 'Mango', id: 1, price: 250 },
        { name: 'Apple', id: 2, price: 150 },
        { name: 'PineApple', id: 3, price: 50 },
    ];

    findAll(): ProductDto[]{
        return this.products;
    }

    findById(id:number) {
        return this.products.find((p) => p.id === id);
    }

    findByCondition(predicate: (product:ProductDto) => boolean) {
        return this.products.filter(p=>predicate(p));
    }



}
