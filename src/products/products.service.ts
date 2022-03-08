import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./products.model";

@Injectable()
export class ProductsService {
    private products: Product[] = []

    add_product (title: string, description: string, price: number): string {
        const id = Math.random().toString()
        const new_product = new Product(id, title, description, price)
        this.products.push(new_product)
        return id
    }

    read_products () {
        return [...this.products]
    }

    read_product (product_id: string) {
        const [product, index] = this.find_product(product_id)
        return { ...product }
    }

    update_product (product_id: string, title: string, description: string, price: number) {
        const [product, index] = this.find_product(product_id)
        const updated_product = {...product}
        if (title) updated_product.title = title
        if (description) updated_product.description = description
        if (price) updated_product.price = price

        this.products[index] = updated_product
    }

    remove_product (product_id: string) {
        const [product, index] = this.find_product(product_id)
        this.products.splice(index, 1)
    }

    private find_product (product_id: string): [Product, number] {
        const index = this.products.findIndex(product => product.id === product_id)
        const product = this.products[index]
        if (!product) throw new NotFoundException(`Couldnt find Product with id: ${product_id}`)
        return [product, index]
    }
}