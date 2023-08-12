import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/shared/models/Product';
import { ShopServiceService } from '../shop-service.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product!:product
  quantity:number = 1
  quantityInBasket:number = 0
  constructor(private shopService:ShopServiceService , 
    private activatedRoute:ActivatedRoute , 
    private bcs:BreadcrumbService,
    private basketService:BasketService) {}
  ngOnInit(): void {
    this.loadProduct()
  }

  loadProduct(){
    let id = this.activatedRoute.snapshot.paramMap.get("id")!
    this.shopService.getProduct(+id).subscribe({
      next : res => {
        this.product = res
        this.bcs.set("@productDetails",res.name)
        var basket = this.basketService.getCurrentBasket()
        debugger
        if(basket){
          var foundItem = basket.items.find(item => item.id == +id)
          if(foundItem){
            this.quantity = foundItem.quantity
            this.quantityInBasket = foundItem.quantity
          }
        }
      },
      error : console.error
    })
  }


  Increment(){
    this.quantity++
  }

  Decrement(){
    this.quantity--
  }

  UpdateBasket(){
    debugger
    if(this.quantity > this.quantityInBasket){
      var itemsToAdd = this.quantity - this.quantityInBasket
      this.basketService.AddItemToBasket(this.product ,  itemsToAdd)
    }else{
      var itemsToRemove = this.quantityInBasket - this.quantity
      this.basketService.RemoveItemFromBasket(this.product.id ,  itemsToRemove)
    }
    this.quantityInBasket = this.quantity

  }

  get buttonText(){
    return  this.quantityInBasket !== 0 ? "Update Basket" : "Add To Basket"
  }
}
