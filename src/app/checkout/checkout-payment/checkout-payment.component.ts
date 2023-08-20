import { Component, ElementRef, Input, ViewChild  , OnInit} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from 'src/app/basket/basket.service';
import { CheckoutService } from '../services/checkout.service';
import { Address } from 'src/app/shared/models/User';
import { OrderRequest } from 'src/app/shared/models/Order';
import { Basket } from 'src/app/shared/models/Basket';
import { NavigationExtras, Router } from '@angular/router';
import { Stripe, loadStripe , StripeCardNumberElement, StripeCardExpiryElement, StripeCardCvcElement  } from '@stripe/stripe-js';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit {

  @Input() checkoutForm!:FormGroup

  @ViewChild("cardNumber") cardNumberElement!:ElementRef
  @ViewChild("cardExpiry") cardExpiryElement!:ElementRef
  @ViewChild("cardCvc") cardCvcElement!:ElementRef

  cardNumber:StripeCardNumberElement | undefined
  cardExpiry!:StripeCardExpiryElement | undefined
  cardCvc!:StripeCardCvcElement | undefined
  cardErrors!:string | null

  stripe!:Stripe|null;
  constructor( private basketService:BasketService , private toastr:ToastrService , private checkoutService:CheckoutService , private route:Router ){}
  ngOnInit(): void {
    this.LoadStripe()
  }


  CalculateOrder(basket:Basket){
    let deliveryMethod = this.checkoutForm.get("deliveryForm")?.get("deliveryMethod")?.value 
    if(!deliveryMethod || !basket){return}
    //let items = basket.items

    let address = this.checkoutForm.get("addressForm")?.value as Address

    
    var order:OrderRequest = {
      basketID:basket.id,
      paymentIntentId:basket.paymentIntentId,
      deliveryMethodId:deliveryMethod,
      shipToAddress:address
    }

    return order
  }

  createOrder(basket:Basket){
  

    let orderCreated = this.CalculateOrder(basket)

    if(!orderCreated) return
    return firstValueFrom(this.checkoutService.SubmitMyOrder(orderCreated))
  }
 async submitOrder(){
    var basket = this.basketService.getCurrentBasket()

    if(!basket){throw new Error("Error while retrieving basket")}
    try {
      var order = await this.createOrder(basket)
      var result = await this.ConfirmPaymentIntent(basket)

   
        if(result.error){
          this.toastr.error(result.error.message,"",{
            positionClass:"toast-bottom-right"
          })
        }else{
          this.toastr.success("Payment Confirmed","",{
            positionClass:"toast-bottom-right"
          })
          this.basketService.deleteBasket(basket!.id)
          let extras:NavigationExtras = {state:order}
          this.route.navigate(["/checkout/success"] ,  extras)
  
        }
      

    } catch (error:any) {
      this.toastr.error(error.message)
    }
 
    
  }

  ConfirmPaymentIntent(basket:Basket){
 

   var result = this.stripe?.confirmCardPayment(basket.clientSecret! , {
      payment_method:{
        card:this.cardNumber!,
        billing_details:{
          name:this.checkoutForm?.get('paymentForm')?.get('nameOnCard')?.value,
        }
      }
    })
    
    if(!result){
      throw new Error("Error while Confirming Payment")
    }
    
    return result
  }

  LoadStripe(){
    loadStripe("pk_test_51NApEXF6As8Bq8LDGfeenMOfADzSVY82bNg2elTREkyhx4bsyaNYDQKrQAoWiUwIw9OCdmcBlpalUWCgNOU94JNu00zAm5zwGm")
    .then(res=>{
      this.stripe = res

       var elemnts = this.stripe?.elements()

       this.cardNumber = elemnts?.create("cardNumber")
       this.cardNumber?.mount(this.cardNumberElement.nativeElement)
       this.cardNumber?.on("change"  , (event) => {
        if(event.error){this.cardErrors = event.error.message}
        else{
          this.cardErrors = null
        }
       })

       this.cardExpiry = elemnts?.create("cardExpiry")
       this.cardExpiry?.mount(this.cardExpiryElement.nativeElement)
       this.cardExpiry?.on("change"  , (event) => {
        if(event.error){this.cardErrors = event.error.message}
        else{
          this.cardErrors = null
        }
       })

       this.cardCvc = elemnts?.create("cardCvc")
       this.cardCvc?.mount(this.cardCvcElement.nativeElement)
       this.cardCvc?.on("change"  , (event) => {
        if(event.error){this.cardErrors = event.error.message}
        else{
          this.cardErrors = null
        }
       })



    })
  }
}
