import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductDto } from 'src/dto/product.dto';
import { ProductService } from './product.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Product Management')
@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) { }

    // view all products
    @Get('find-all')
    getProductAll(): ProductDto[] {
        return this.productService.findAll();
    }

    // view product by id
    @Get("findById/:id")
    getProductById(@Param('id') id: string) {
        return this.productService.findById(Number(id));
    }

    // view product by name 
    @Get('findByProductname/:productname')
    getProductByName(@Query('name') productName: string) {
        return this.productService.findByCondition((product) =>
            product.name.includes(productName));
    }


}
