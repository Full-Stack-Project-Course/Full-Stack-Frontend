import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm:FormGroup
  constructor(fb:FormBuilder , private route:Router , private accountService:AccountService) {
    this.registerForm  = fb.group({
      displayName : ["" , Validators.required],
      email : ["" , [Validators.email,Validators.required]],
      password : ["" , Validators.required]
    })

   }

   onSubmit(){
    this.accountService.register(this.registerForm.value).subscribe()
   }
}
