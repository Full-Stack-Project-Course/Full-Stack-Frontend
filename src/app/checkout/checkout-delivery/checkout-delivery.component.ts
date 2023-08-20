import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DeliveryMethod } from 'src/app/shared/models/DeliveryMethod';
import { CheckoutService } from '../services/checkout.service';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss']
})
export class CheckoutDeliveryComponent {
  @Input() checkoutForm?:FormGroup;
  deliveryMethods:DeliveryMethod[]=[];

  constructor(private checkoutService:CheckoutService , public basketService:BasketService){
    this.getDelvieryMethods();
  
  }

  getDelvieryMethods(){
    this.checkoutService.getDeliveryMethods().subscribe({
      next:res => {
       // this.LoadCurrentDeliveryMethod();
        this.deliveryMethods = res
      }
    })
  }



}
