import { Component , OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { ActivatedRoute } from '@angular/router';
import { OrderReponse } from 'src/app/shared/models/Order';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {


  order!:OrderReponse
  constructor(private orderService:OrderService , private activeroute:ActivatedRoute , private BCS:BreadcrumbService){
    

  }
  ngOnInit(): void {
    let id = this.activeroute.snapshot.params["id"];
    this.loadTargetOrder(id)
  }

  loadTargetOrder(orderID:number){
    this.orderService.getOneOrderByID(orderID).subscribe({
      next:order=>{
        this.order = order
        this.BCS.set("@orderDetails",`Order Detail #${orderID} - ${order.status}`)
      }
    })
  }

}
