import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { OrderRequest } from 'src/app/shared/models/Order';
import { Address } from 'src/app/shared/models/User';
import { CheckoutService } from '../services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit  {

  checkoutForm= this.fb.group({
    addressForm:this.fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      street:['',Validators.required],
      city:['',Validators.required],
      state:['',Validators.required],
      zipCode:['',Validators.required]
    }),
    deliveryForm:this.fb.group({
      deliveryMethod:['',Validators.required]
    }),
    paymentForm:this.fb.group({
      nameOnCard:['',Validators.required]
    })
  })

  constructor(private fb:FormBuilder , private accountService:AccountService , private basketService:BasketService ) {}
  ngOnInit(): void {
    this.loadUserAddress()
    this.loadCurrentBasket()
  }

  loadUserAddress(){
    this.accountService.getUserAddress().subscribe({
      next:res => this.checkoutForm.get("addressForm")?.setValue(res)
    })  
  }

  loadCurrentBasket(){

    var basket = this.basketService.getCurrentBasket()
    
    this.checkoutForm.get("deliveryForm")?.get("deliveryMethod")?.patchValue(basket!.deliveryMethodId!.toString())

  }

  
}
