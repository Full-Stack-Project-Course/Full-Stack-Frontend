import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './paging-header/paging-header.component';
import { PagingComponent } from './paging/paging.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { OrderTotalComponent } from './order-total/order-total.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {CdkStepperModule} from "@angular/cdk/stepper";
import { StepperComponent } from './stepper/stepper.component';
import { BasketSummaryComponent } from './basket-summary/basket-summary.component';
import { RouterModule } from '@angular/router';






@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagingComponent,
    StepperComponent,
    OrderTotalComponent,
    BasketSummaryComponent,
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    RouterModule,
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    CarouselModule,
    CdkStepperModule
  ],
  exports:[ BasketSummaryComponent ,StepperComponent,CdkStepperModule , PaginationModule , BsDropdownModule , ReactiveFormsModule , PagingHeaderComponent , PagingComponent , CarouselModule , OrderTotalComponent]
})
export class SharedModule { }
