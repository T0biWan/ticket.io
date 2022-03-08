import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor (private readonly products_service: ProductsService) {}

    @Post()
    add_product (@Body('title') product_title: string, @Body('description') product_description: string, @Body('price') product_price: number): object {
        const new_product_id = this.products_service.add_product(product_title, product_description, product_price)
        return { id: new_product_id }
    }

    @Get()
    get_all_products () {
        return this.products_service.read_products()
    }

    @Get(':product_id')
    get_product (@Param('product_id') product_id :string) {
        const product = this.products_service.read_product(product_id)
        return product
    }

    @Patch(':product_id')
    update_product (@Param('product_id') product_id :string, @Body('title') product_title: string, @Body('description') product_description: string, @Body('price') product_price: number) {
        this.products_service.update_product(product_id, product_title, product_description, product_price)
        return null
    }

    @Delete(':product_id')
    delete_product (@Param('product_id') product_id :string) {
        this.products_service.remove_product(product_id)
        return null
    }
}