import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Basket, BasketItem, BasketTotal } from '../shared/models/Basket';
import { BehaviorSubject } from 'rxjs';
import { product } from '../shared/models/Product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private http:HttpClient) { }

  private BasketSource$:BehaviorSubject<null | Basket> = new BehaviorSubject<null | Basket>(null) 

  BasketSource = this.BasketSource$.asObservable()

  private BasketTotalSource$:BehaviorSubject<null | BasketTotal> = new BehaviorSubject<null | BasketTotal>(null) 

  BasketTotal = this.BasketTotalSource$.asObservable()

  baseUrl = 'http://localhost:5032/api/Basket';
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

  CalculateTotals(){
    var shipping = 0
    var basket = this.getCurrentBasket()
    if(!basket){return}
    var subtotal = basket.items.reduce((sum , item) => sum += (item.quantity * item.price) , 0 )
    this.BasketTotalSource$.next({
      shipping , subtotal , total : subtotal+shipping
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

  private deleteBasket(basket_ID:string){
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




