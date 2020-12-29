import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Manifest } from 'src/app/models/Manifest';
import {retry, catchError } from 'rxjs/operators' ;
import { UtilsService } from '../utils/utils.service';
import { environment } from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class ManifestService {
  private _activeManifestId:string
  constructor(
    private http:HttpClient
  ) 
  {

  }

  get activeManifest(){
    
    if(this._activeManifestId){
  
      return this.getManifest(this._activeManifestId)
    }else{
      return {status:false,error:'could not retrieve the manifest, try selecting one on the manifests page'}
    }
    
  }

  
  get activeManifestId():string{
    return this._activeManifestId
  }

  set activeManifestId(id){
    this._activeManifestId = id
  }
  getManifest(id):Observable<any>{
    return this.http.get<any>(`${environment.BACKEND_BASE_URL}/manifests/${id}`,UtilsService.httpOptions)
    .pipe(
      catchError(UtilsService.errorHandler)
    ) 
  }

  getManifests(category):Observable<any>{
     return this.http.get<any>(`${environment.BACKEND_BASE_URL}/manifests${UtilsService.prepareQuery(category)}`,UtilsService.httpOptions)
    .pipe(
      catchError(UtilsService.errorHandler)
    ) 
    
  }

  createManifest(manifest):Observable<any>{
    return this.http.post(`${environment.BACKEND_BASE_URL}/manifests`,{manifest:manifest},UtilsService.httpOptions)
    .pipe(
      catchError(UtilsService.errorHandler)
    )
  }

  updateManifest(update,id):Observable<any>{
    return this.http.put(`${environment.BACKEND_BASE_URL}/manifests`,{update:update,id:id},UtilsService.httpOptions)
    .pipe(
      catchError(UtilsService.errorHandler)
    )
  }

  deleteManifest(id):Observable<any>{
    return this.http.delete(`${environment.BACKEND_BASE_URL}/manifests/${id}`,UtilsService.httpOptions)
    .pipe(
      catchError(UtilsService.errorHandler)
    )
  }

  
  getCount(category):Observable<any>{
    return this.http.get<any>(`${environment.BACKEND_BASE_URL}/manifests/count${UtilsService.prepareQuery(category)}`,UtilsService.httpOptions)
   .pipe(
     catchError(UtilsService.errorHandler)
   ) 
  }

  
  generatePdf(id){
    return this.http.post(`${environment.BACKEND_BASE_URL}/manifests/pdf/${id}`,{},UtilsService.httpOptions)
    .pipe(
      catchError(UtilsService.errorHandler)
    )
  }

  sendEmail(id,values){
    return this.http.post(`${environment.BACKEND_BASE_URL}/manifests/email/${id}`,{values:values},UtilsService.httpOptions)
    .pipe(
      catchError(UtilsService.errorHandler)
    )
  }

}
