import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    NavBarComponent,
    ErrorComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxSpinnerModule,
    SharedModule,
    BreadcrumbModule
  ],

  exports:[NavBarComponent , HeaderComponent , NgxSpinnerModule]
})
export class CoreModule { }
