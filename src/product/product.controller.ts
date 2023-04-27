import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ProductDto } from 'src/dto/product.dto';
import { ProductService } from './product.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Product Management')
@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) { }

    /*
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
    @Get('findByProductname')
    getProductByName(@Query('productname') productName: string) {
        return this.productService.findByCondition((product) =>
        product.name.includes(productName));
    }
    */

    @Get("test")
    test(@Query('name') name: string) {
        return this.productService.findByProductName(name);
    }

    // view all products
    @Get('find-all-products')
    getAllProducts() {
        return this.productService.findAllProducts();
    }

    // create product
    @Post('create-product')
    createProduct(@Body() productDto: ProductDto) {
        return this.productService.createProduct(productDto);
    }

}
