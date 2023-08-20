import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { ShopModule } from './shop/shop.module';
import { HttpClientModule  , HTTP_INTERCEPTORS} from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { JWTTokenInterceptor } from './core/interceptors/jwttoken.interceptor';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    ToastrModule.forRoot(),
    
    HttpClientModule,
    
    HomeModule,
    BrowserAnimationsModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS , useClass:LoadingInterceptor , multi:true
  },{
    provide:HTTP_INTERCEPTORS , useClass:JWTTokenInterceptor , multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
