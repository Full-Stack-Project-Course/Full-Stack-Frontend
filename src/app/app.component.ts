import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  /**
   *
   */
  constructor(private account:AccountService) {}
  ngOnInit(): void {
    this.loadCurrentUser()
  }

  loadCurrentUser(){
    let token = localStorage.getItem("token") || null
    this.account.loadCurrentUser(token).subscribe()
  }
  title = 'Full_Project_FrontEnd';
}
