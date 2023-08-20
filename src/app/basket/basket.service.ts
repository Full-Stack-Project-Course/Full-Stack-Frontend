import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Basket, BasketItem, BasketTotal } from '../shared/models/Basket';
import { BehaviorSubject, map } from 'rxjs';
import { product } from '../shared/models/Product';
import { DeliveryMethod } from '../shared/models/DeliveryMethod';
import { enviroment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private http:HttpClient) { }

  private BasketSource$:BehaviorSubject<null | Basket> = new BehaviorSubject<null | Basket>(null) 

  BasketSource = this.BasketSource$.asObservable()

  private BasketTotalSource$:BehaviorSubject<null | BasketTotal> = new BehaviorSubject<null | BasketTotal>(null) 

  BasketTotal = this.BasketTotalSource$.asObservable()
  ShippingCost!:DeliveryMethod

  baseUrl = enviroment.baseURL + 'Basket';
  getBasket(id:string){
    return this.http.get<Basket>(this.baseUrl + `/${id}`)
    .subscribe({
      next : basket => {
        this.BasketSource$.next(basket)
        this.CalculateTotals()
      }
    })
  }

  setBasket(basket:Basket){
    return this.http.patch<Basket>(this.baseUrl , basket).subscribe({
      next : basket => {
        this.BasketSource$.next(basket)
        this.CalculateTotals()
      }
    })
  }

  getCurrentBasket(){
    return this.BasketSource$.value
  }

  setShippingPrice(deliverymethod:DeliveryMethod){
    let basket = this.getCurrentBasket()

    if(basket){
      basket.shippingPrice=deliverymethod.price;
      console.log("shipping price is ",deliverymethod)
      basket.deliveryMethodId=deliverymethod.id;
      this.setBasket(basket);
    }
   

  }

  CreatePaymentIntent(){
    var basket = this.getCurrentBasket()
    if (!basket){return}
    console.log(basket)
    return this.http.post<Basket>(enviroment.baseURL + `payment/${basket.id}`,{} ).pipe(map(basketdto => {
      this.BasketSource$.next(basketdto)

    }))
  }

  CalculateTotals(){
   
    var basket = this.getCurrentBasket()
    if(!basket){return}
    let shipping = basket.shippingPrice ?? 0
    var subtotal = basket.items.reduce((sum , item) => sum += (item.quantity * item.price) , 0 )
    this.BasketTotalSource$.next({
      shipping:shipping , subtotal , total : subtotal+shipping
    })
  }

  RemoveItemFromBasket(item_id:number , quantity:number){
    var basket = this.getCurrentBasket()
    if(!basket){return}
    var FoundItem = basket.items.find(item => item.id == item_id)
    if(!FoundItem){return}
    FoundItem.quantity-=quantity

    if(FoundItem.quantity <= 0){
      basket.items = basket.items.filter(item => item.id !== item_id)
    }

    if(basket.items.length == 0){
      this.deleteBasket(basket.id)
    }else{
      this.setBasket(basket)
    }

  }

  isProduct(item:product | BasketItem):boolean{
    return (item as product).productBrand !== undefined
  }

  

   deleteBasket(basket_ID:string){
    return this.http.delete<Basket>(this.baseUrl+ `/${basket_ID}`).subscribe(() => {
      this.BasketSource$.next(null)
      this.BasketTotalSource$.next(null)
      localStorage.removeItem("basketID")
    })
  }
  AddItemToBasket(item:product | BasketItem , quantity:number=1){
    
    if(this.isProduct(item)) item = this.mapFromProductToBasketItem(item as product)
    var currentBasket = this.getCurrentBasket() ?? this.createBasket()
    this.UpdateOrAdditemToBasket(item as BasketItem , currentBasket , quantity )
    this.setBasket(currentBasket)
  }
  private UpdateOrAdditemToBasket(basket_item: BasketItem, currentBasket: Basket , quantity:number) {
    var foundItem = currentBasket.items.find(item => item.id == basket_item.id);
    if(foundItem) foundItem.quantity += quantity
    else{
      basket_item.quantity = quantity
      currentBasket.items.push(basket_item)
    }

  }
  createBasket(): Basket {
    var basket = new Basket()
    localStorage.setItem("basketID" , basket.id)
    return basket
  }
  
  private mapFromProductToBasketItem = (item: product):BasketItem => {
    return {
      id : item.id,
      brand : item.productBrand,
      pictureURL : item.pictureUrl,
      price : item.price,
      quantity : 1,
      productName : item.name,
      type : item.productType

    }
  }
}




