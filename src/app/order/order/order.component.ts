import { Component , OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { OrderReponse } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orders!:OrderReponse[] 
  constructor(private orderService:OrderService){

  }
  ngOnInit(): void {
    this.LoadCurrentOrders()
  }

  LoadCurrentOrders(){
    this.orderService.getOrdersForUser().subscribe({
      next:orders=>this.orders = orders
    })
  }

}
