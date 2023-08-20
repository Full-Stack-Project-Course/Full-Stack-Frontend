import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'src/environments/environments';
import { Address, User } from '../shared/models/User';
import { Observable, ReplaySubject, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient) { }

  private currentUserSource = new ReplaySubject<User | null>(1)
  currentUser = this.currentUserSource.asObservable()
  baseURL=enviroment.baseURL + "account/"

  login(values:any){
    return this.http.post<User>(this.baseURL+"login" , values)
    .pipe(map(user => {

      this.currentUserSource.next(user)
      localStorage.setItem("token" , user.token)
      return user
    }))
  }

  logout(){
    this.currentUserSource.next(null)
    localStorage.removeItem("token")
  }


  loadCurrentUser(token:string | null) :Observable<null | User> {
    if(token == null){
      this.currentUserSource.next(null)
      return of(null)
    }
    let myheaders = new HttpHeaders()
    myheaders = myheaders.set("Authorization" , `Bearer ${token}`)
    return this.http.get<User>(this.baseURL+"getuser" ).pipe(
      map(user => {
        this.currentUserSource.next(user)
        localStorage.setItem("token" , user.token)
        return user
      })
    )
  }

  getUserAddress(){
    return this.http.get<Address>(this.baseURL+"address")
  }

  UpdateUserAddress(address:Address){
    return this.http.put<Address>(this.baseURL+"address" , address)
  }

  register(values:any){
    return this.http.post<User>(this.baseURL+"register" , values)
    .pipe(map(user => {

      this.currentUserSource.next(user)
      localStorage.setItem("token" , user.token)
      return user
    }))
  }
}
