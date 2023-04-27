import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto } from 'src/dto/product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    ) { }

    /*
    private products: ProductDto[] =
        [
            { name: 'Mango', id: 1, price: 250 },
            { name: 'Apple', id: 2, price: 150 },
            { name: 'PineApple', id: 3, price: 50 },
        ];

    findAll(): ProductDto[] {
        return this.products;
    }

    findById(id: number) {
        return this.products.find((p) => p.id === id);
    }

    findByCondition(predicate: (product: ProductDto) => boolean) {
        return this.products.filter(p => predicate(p));
    }
*/
    async findByProductName(productName: string) {
        let result = await this.productRepository
            .createQueryBuilder("product")
            .where("product.name = :name", { name: productName })
            .getOneOrFail();

        return result;
    }

    async findAllProducts() {
        let result = await this.productRepository.createQueryBuilder("product").getMany();
        return result;
    }

    async createProduct(productDto: ProductDto) {
        let findProduct = await this.productRepository.createQueryBuilder("product")
            .where("product.name =:name", { name: productDto.name })
            .getOne();

        if (!findProduct || findProduct === null) {
            const newProduct = this.productRepository.create(productDto);
            return this.productRepository.save(newProduct);
        } else {
            return "Product already exists in the system";
        }
    }

}
