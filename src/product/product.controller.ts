import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductDto } from 'src/dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) { }

    @Get()
    getProductAll(@Query('name') productName?: string): ProductDto[] {
        if (productName) {
            return this.productService.findByCondition((product) =>
            product.name.includes(productName));
        }
        return this.productService.findAll();
    }

    @Get(":id")
    getProductById(@Param('id') id: string) {
        return this.productService.findById(Number(id));
    }


}
