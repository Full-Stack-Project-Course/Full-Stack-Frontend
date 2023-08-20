import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { DeliveryMethod } from 'src/app/shared/models/DeliveryMethod';
import { OrderRequest } from 'src/app/shared/models/Order';
import { enviroment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http:HttpClient , private accountService:AccountService) { }
  baseApi:string = enviroment.baseURL + "order"


  getDeliveryMethods(){
    return this.http.get<DeliveryMethod[]>(this.baseApi+"/deliverymethods")
  }


  SubmitMyOrder(order:OrderRequest){
    

    return this.http.post(this.baseApi ,order )
  }




}
