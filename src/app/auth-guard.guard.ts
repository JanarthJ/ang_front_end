import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanLoad {
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let datas=localStorage.getItem('authtokens');
    console.log(datas);
    try {
      axios({
        method: 'post',
        url: 'http://127.0.0.1:5002/checkAuth',
        data:datas
      }).then( (response) => {
          console.log(response);
          if(response.data.data){
            if(response.data.status==="Valid"){ 
              return true;
            }
            else{
              return false;
            }
          }
          else{
            return false;
          }
        });
    }catch (error) {
      alert("Internal Server Error!..");
      console.log(error);
      return false;
    }
    return false;
  }
}
