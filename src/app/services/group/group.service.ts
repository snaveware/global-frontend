import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import {retry, catchError } from 'rxjs/operators' ;
import { UtilsService } from '../utils/utils.service';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private _activeGroupId:string
  constructor(
    private http:HttpClient
  ) 
  {

  }

  get activeGroup(){
    
    if(this._activeGroupId){
  
      return this.getGroup(this._activeGroupId)
    }else{
      return {status:false,error:'could not retrieve the group, try selecting one on the groups page'}
    }
    
  }


  get activeGroupId():string{
    return this._activeGroupId
  }

  set activeGroupId(id){
    this._activeGroupId = id
  }
  getGroup(id):Observable<any>{
    return this.http.get<any>(`${environment.BACKEND_BASE_URL}/groups/${id}`,UtilsService.httpOptions)
    .pipe(
      catchError(UtilsService.errorHandler)
    ) 
  }

  getGroups(category):Observable<any>{
     return this.http.get<any>(`${environment.BACKEND_BASE_URL}/groups${UtilsService.prepareQuery(category)}`,UtilsService.httpOptions)
    .pipe(
      catchError(UtilsService.errorHandler)
    ) 
    
  }

  createGroup(group):Observable<any>{
    return this.http.post(`${environment.BACKEND_BASE_URL}/groups`,{group:group},UtilsService.httpOptions)
    .pipe(
      catchError(UtilsService.errorHandler)
    )
  }

  updateGroup(update,id):Observable<any>{
    return this.http.put(`${environment.BACKEND_BASE_URL}/groups`,{update:update,id:id},UtilsService.httpOptions)
    .pipe(
      catchError(UtilsService.errorHandler)
    )
  }

  deleteGroup(id):Observable<any>{
    return this.http.delete(`${environment.BACKEND_BASE_URL}/groups/${id}`,UtilsService.httpOptions)
    .pipe(
      catchError(UtilsService.errorHandler)
    )
  }

  getCount(category):Observable<any>{
    return this.http.get<any>(`${environment.BACKEND_BASE_URL}/groups/count${UtilsService.prepareQuery(category)}`,UtilsService.httpOptions)
   .pipe(
     catchError(UtilsService.errorHandler)
   ) 
  }
}
