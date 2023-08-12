import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  loginForm:FormGroup
  returnURL:string
  constructor( fb:FormBuilder , private accountService:AccountService , private route:Router , private activatedroute:ActivatedRoute) { 

    this.returnURL = activatedroute.snapshot.queryParams["returnURL"] || "/shop"
    this.loginForm = fb.group({
      email : ["" , Validators.required],
      password : ["",Validators.required]
    })
  }


  onSubmit(){
    this.accountService.login(this.loginForm.value).subscribe({
      next : _ => this.route.navigate([this.returnURL])
    })
  }
}
