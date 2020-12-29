import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import {retry, catchError } from 'rxjs/operators' ;
import { UtilsService } from '../utils/utils.service';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {
  private _activeShipmentId:string
  constructor(
    private http:HttpClient
  ) 
  {

  }

  get activeShipment(){
    if(this._activeShipmentId){
      return this.getShipment(this._activeShipmentId)
    }else{
      return {status:false,error:'could not retrieve the shipment, try selecting one on the shipments page'}
    }
    
  }


  get activeShipmentId():string{
    return this._activeShipmentId
  }

  set activeShipmentId(id){
    this._activeShipmentId = id
  }
  
  getShipment(id):Observable<any>{
    return this.http.get<any>(`${environment.BACKEND_BASE_URL}/shipments/${id}`,UtilsService.httpOptions)
    .pipe(
      catchError(UtilsService.errorHandler)
    ) 
  }

  getShipments(category):Observable<any>{
     return this.http.get<any>(`${environment.BACKEND_BASE_URL}/shipments${UtilsService.prepareQuery(category)}`,UtilsService.httpOptions)
    .pipe(
      catchError(UtilsService.errorHandler)
    ) 
    
  }

  createShipment(shipment):Observable<any>{
    return this.http.post(`${environment.BACKEND_BASE_URL}/shipments`,{shipment:shipment},UtilsService.httpOptions)
    .pipe(
      catchError(UtilsService.errorHandler)
    )
  }

  updateShipment(update,id):Observable<any>{
    return this.http.put(`${environment.BACKEND_BASE_URL}/shipments`,{update:update,id:id},UtilsService.httpOptions)
    .pipe(
      catchError(UtilsService.errorHandler)
    )
  }

  deleteShipment(id):Observable<any>{
    return this.http.delete(`${environment.BACKEND_BASE_URL}/shipments/${id}`,UtilsService.httpOptions)
    .pipe(
      catchError(UtilsService.errorHandler)
    )
  }

  getCount(category):Observable<any>{
    return this.http.get<any>(`${environment.BACKEND_BASE_URL}/shipments/count${UtilsService.prepareQuery(category)}`,UtilsService.httpOptions)
   .pipe(
     catchError(UtilsService.errorHandler)
   ) 
  }
}
