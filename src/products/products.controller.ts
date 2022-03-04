import { Body, Controller, Post } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor (private readonly products_service: ProductsService) {}

    @Post()
    add_product (@Body('title') product_title: string, @Body('description') product_description: string, @Body('price') product_price: number): object {
        const new_product_id = this.products_service.add_product(product_title, product_description, product_price)
        return { id: new_product_id }
    }
}