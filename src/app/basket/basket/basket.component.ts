import { Component } from '@angular/core';
import { BasketService } from '../basket.service';
import { BasketItem } from 'src/app/shared/models/Basket';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {

  constructor(public basketService:BasketService) {}

  removeItem(itemID:number , quantity:number){
    
    this.basketService.RemoveItemFromBasket(itemID , quantity)
  }

  incrementQuantity(item:BasketItem){

    this.basketService.AddItemToBasket(item)

  }
}
