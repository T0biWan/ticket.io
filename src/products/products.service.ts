import { Injectable } from "@nestjs/common";
import { Product } from "./products.model";

@Injectable()
export class ProductsService {
    products: Product[] = []

    add_product (title: string, description: string, price: number): string {
        const id = new Date().toString()
        const new_product = new Product(id, title, description, price)
        this.products.push(new_product)
        return id
    }
}