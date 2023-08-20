import { Address } from "./User"

export interface OrderRequest{
    deliveryMethodId: number,
    basketID: string,
    paymentIntentId?: string,
    shipToAddress: Address
}

export interface OrderReponse{
    items:OrderItem[]
    id:number,
    status:string
    subTotal:number
    total:number
    deliveryMethod:string
    shippingPrice :number
    address:Address

    buyerEmail :string

    orderDate :Date;
    paymentIntentId :string
}

export interface OrderItem{
    

    quantity: number,
  
        productItemID: number,
        productName: string,
        pictureURL: string
    
    price: 0

      
}