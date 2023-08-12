import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';


let canActivateHelper = (state:RouterStateSnapshot):Observable<boolean> => {
    let accountService = inject(AccountService)
    let route = inject(Router)
   return accountService.currentUser.pipe(
      map(auth => {
        console.log(auth)
        if(auth == null){
          route.navigate(["/account/login"] , {
            queryParams:{returnURL : state.url}
          })
          return false
        }
        return true
      })
      )
    }
export const authGuard: CanActivateFn = (route, state) => {
  return canActivateHelper(state) ;
};
