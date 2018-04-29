import { Injectable }     from '@angular/core';
import { CanActivate }    from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate() {
    console.log('AuthGuard#canActivate called');
    if(localStorage.getItem("apiKey")){
        return true;
    }
    else{
        return false
    }
  }
}