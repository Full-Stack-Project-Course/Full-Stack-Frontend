import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { BasketItem } from '../models/Basket';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss']
})
export class BasketSummaryComponent {

  @Input() isBasket:boolean = true
  @Output() AddItem = new EventEmitter()
  @Output() RemoveItem = new EventEmitter<{itemID:number , quantity:number}>()
  constructor(public basketService:BasketService) {}

  addItem(item:BasketItem){
      this.AddItem.emit(item)
  }

  Remove(itemID:number , quantity:number){
    this.RemoveItem.emit({itemID , quantity})
  }
}
