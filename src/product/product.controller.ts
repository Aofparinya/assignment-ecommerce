import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ProductDto } from 'src/dto/product.dto';
import { ProductService } from './product.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Product Management')
@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) { }

    // view specific product 
    @Get("find-product-by-name")
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
