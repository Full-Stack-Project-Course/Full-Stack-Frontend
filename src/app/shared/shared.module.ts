import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './paging-header/paging-header.component';
import { PagingComponent } from './paging/paging.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { OrderTotalComponent } from './order-total/order-total.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';






@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagingComponent,
 
    OrderTotalComponent,
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    CarouselModule
  ],
  exports:[PaginationModule , BsDropdownModule , ReactiveFormsModule , PagingHeaderComponent , PagingComponent , CarouselModule , OrderTotalComponent]
})
export class SharedModule { }
