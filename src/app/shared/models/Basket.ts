import { createId } from "@paralleldrive/cuid2"

export interface BasketItem{

    id:number
    productName:string
    pictureURL:string
    brand:string
    type:string
    price:number
    quantity:number

}

export interface Basket{
    id:string
    items:BasketItem[]
}

export interface BasketTotal{
    shipping:number,
    total:number,
    subtotal:number
}

export class Basket implements Basket{
    id: string

    constructor() {
        this.id = createId()
        
    }
    items: BasketItem[] = []
}


