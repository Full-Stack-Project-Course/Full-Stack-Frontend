import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderReponse } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.scss']
})
export class CheckoutSuccessComponent {
  order?:OrderReponse;
  constructor(private activatedRoute:ActivatedRoute){
    
  }
}
