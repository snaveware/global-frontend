import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs'
import { UtilsService} from '../utils/utils.service'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn = new Subject<boolean>()
  //subscribe to login changes
  public isLoggedIn$ = this._isLoggedIn.asObservable()


  constructor(
    private router:Router,
    private http:HttpClient

  ) {
   
   }

  set isLoggedIn(data:{state:boolean,details:any}){
    if(data.details){
      sessionStorage.setItem('id',data.details.id)
      sessionStorage.setItem('token',data.details.token)
      sessionStorage.setItem('firstName',data.details.firstName)
      sessionStorage.setItem('lastName',data.details.lastName)
      sessionStorage.setItem('level',JSON.stringify(data.details.level))
      sessionStorage.setItem('permissions',JSON.stringify(data.details.permissions))
      
    }
    if(!data.state){
      sessionStorage.removeItem('id')
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('firstName')
      sessionStorage.removeItem('lastName')
      sessionStorage.removeItem('level')
      sessionStorage.removeItem('permissions') 
      this.router.navigate(['/login'])
      console.log('not logged in')
    }
    this._isLoggedIn.next(data.state)
    console.log('login state ',data.state)
  }

  login(credentials:{email:string,password:string}){
    return this.http.post(`${environment.BACKEND_BASE_URL}/auth/login`,credentials)
    .pipe(
      catchError(UtilsService.errorHandler)
    )
  }

}
