import { Component, Input } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { product } from 'src/app/shared/models/Product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {

  @Input() product!:product

  constructor(public basketService:BasketService) {}
  
}
