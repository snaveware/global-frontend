import { Injectable } from '@angular/core';
import { HttpHeaders} from '@angular/common/http'
import { throwError } from 'rxjs';
import { environment } from '../../../environments/environment'
import { Observable,of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    
  ) { }
  
  static httpOptions = { 
    headers:UtilsService.checkInitialLoginStatus()? new HttpHeaders({
      'token': UtilsService.getToken()
    }):{}
  }

  static permissions = sessionStorage.getItem('permissions')?JSON.parse(sessionStorage.getItem('permissions')) : JSON.parse(localStorage.getItem('permissions'))

  static checkInitialLoginStatus(){
    let loggedIn
    if(sessionStorage.getItem('token')){
      loggedIn = true
    }else if(localStorage.getItem('token')){
      loggedIn = true
    }else{
      loggedIn =false
    }
    console.log('initial',loggedIn)  
    return loggedIn
  }

  static errorHandler(error){
    console.log('error',error)
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      return of({isError:true, message:'unable to make your request. please check your connection'})
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      return of({isError:true, message: error.error}) 
    }
    // Return an observable with a user-facing error message.
    
  }

  

  static calculateNextPage(currentBatch:number,totalInDb:number){
    const totalBatches = Math.ceil(totalInDb/environment.BATCH_COUNT)

    if(totalBatches > currentBatch){
      return true
    }

    return false

  }

  static getToken():string{
    let token = sessionStorage.getItem('token')
    if(!token){
      token = localStorage.getItem('token')
    }
    return token
  }

  static getId():string{
    let id = sessionStorage.getItem('id')
    if(!id){
      id = localStorage.getItem('id')
    }
    return id
  }

  static getNames():string{
    let firstName = sessionStorage.getItem('firstName')
    let lastName = sessionStorage.getItem('lastName')
    
    if(!firstName){
      firstName = localStorage.getItem('firstName')
      lastName = localStorage.getItem('lastName')
    }
    return `${firstName} ${lastName}`
  }

  static prepareQuery(category){
    let search = location.search
    if(search == ''){
      if(category && category != '')
      {
        search = `?c=${category}`
      }
      
    }else{
      if(category && category != ''){
        search = `${search}&c=${category}`
        console.log(search)
      }
      
    }
    return search
  }

  static extractPath(url){
    let path:string = url
    if(url.charAt(0) == '/'){
      path = url.replace('/','')
    }
    if(path.indexOf('?') != -1){
      path = path.split('?')[0]
    }
    return path
  }
}
