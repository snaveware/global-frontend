import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
import {retry, catchError } from 'rxjs/operators' ;
import { UtilsService } from '../utils/utils.service';
import { environment } from '../../../environments/environment'
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _activeUserId:string
  constructor(
    private http:HttpClient
  ) 
  {
    this._activeUserId = UtilsService.getId()
  }

  get activeUser(){
    
    if(this._activeUserId){

      return this.getUser(this._activeUserId)
    }else{
      return {status:false,error:'could not retrieve the user, try selecting one on the users page'}
    }
    
  }

  get activeUserId():string{
    return this._activeUserId
  }

  set activeUserId(id){
    this._activeUserId = id
  }
  getUser(id):Observable<any>{
    return this.http.get<any>(`${environment.BACKEND_BASE_URL}/users/${id}`,UtilsService.httpOptions)
    .pipe(
      catchError(UtilsService.errorHandler)
    ) 
  }

  getUsers(category):Observable<any>{
    return this.http.get<any>(`${environment.BACKEND_BASE_URL}/users${UtilsService.prepareQuery(category)}`,UtilsService.httpOptions)
    .pipe(
      catchError(UtilsService.errorHandler)
    ) 
    
  }

  createUser(user):Observable<any>{
    return this.http.post(`${environment.BACKEND_BASE_URL}/users`,{user:user},UtilsService.httpOptions)
    .pipe(
      catchError(UtilsService.errorHandler)
    )
  }

  updateUser(update,id):Observable<any>{
    return this.http.put(`${environment.BACKEND_BASE_URL}/users`,{update:update,id:id},UtilsService.httpOptions)
    .pipe(
      catchError(UtilsService.errorHandler)
    )
  }

  deleteUser(id):Observable<any>{
    return this.http.delete(`${environment.BACKEND_BASE_URL}/users/${id}`,UtilsService.httpOptions)
    .pipe(
      catchError(UtilsService.errorHandler)
    )
  }

  uploadProfile(id,profile):Observable<any>{
    let formData:FormData = new FormData()
    formData.append('profile',profile)
    console.log('formData',formData)
    return this.http.post(`${environment.BACKEND_BASE_URL}/users/upload/${id}`,formData,UtilsService.httpOptions)
    .pipe(
      catchError(UtilsService.errorHandler)
    )
  }

  findEmails():Observable<any>{
    return this.http.get(`${environment.BACKEND_BASE_URL}/users/emails`,UtilsService.httpOptions)
    .pipe(
      catchError(UtilsService.errorHandler)
    )
  }

  getCount(category):Observable<any>{
    return this.http.get<any>(`${environment.BACKEND_BASE_URL}/users/count${UtilsService.prepareQuery(category)}`,UtilsService.httpOptions)
   .pipe(
     catchError(UtilsService.errorHandler)
   ) 
  }

  
}
