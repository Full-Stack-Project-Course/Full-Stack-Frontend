import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'src/environments/environments';
import { OrderReponse } from '../shared/models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  baseApi = enviroment.baseURL + "order"

  getOrdersForUser(){
    return this.http.get<OrderReponse[]>(this.baseApi)
  }

  getOneOrderByID(id:number){
    return this.http.get<OrderReponse>(this.baseApi+`/${id}`)
  }
}
