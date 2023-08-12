import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loadingTimer:number = 0
  constructor(private spinnerService:NgxSpinnerService) { }

  busy(){
    this.loadingTimer++
    this.spinnerService.show(undefined , {
      type:"ball-newton-cradle",
      bdColor: 'rgba(255,255,255,0.7)',
      color:"#333333"
      
    })
  }

  idle(){
    this.loadingTimer--;
    if(this.loadingTimer <= 0){
      this.loadingTimer = 0
      this.spinnerService.hide()
    }
  }
}
