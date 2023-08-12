import { Component , OnChanges, OnInit } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { BasketItem } from 'src/app/shared/models/Basket';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  

  constructor(public basketService:BasketService , public account:AccountService  ) {}
  ngOnInit(): void {
    var id = localStorage.getItem("basketID")
    id && this.basketService.getBasket(id)
  }

  getCount(items:BasketItem[]){
    return items.reduce((sum , item) => sum += item.quantity ,0)
  }
}
