import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isObservable } from 'rxjs';
import { Group } from 'src/app/models/Group';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user/user.service';
import { environment } from '../../../../environments/environment';
import { UtilsService } from '../../../services/utils/utils.service'

@Component({
  selector: 'app-user-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class UserViewComponent implements OnInit {
  user:User
  group:Group
  showWarning:boolean
  warningMessage:string
  isLoadingResults:boolean = true
  action:string
  userProfileUrl
  constructor(
    private router:Router,
    private userService:UserService,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data
    .subscribe(data =>{
      if(data && data.action){
        this.action = data.action
      }
      this.getUser()
    })
   
    console.log('user',this.user)
  }


  navigate(route){
    this.router.navigate([route])
  }


  getUser(){
    const user = this.userService.activeUser

    if(isObservable(user)){
      user.subscribe(result =>{
        this.afterSubscribing(result)
      })
    }else{
      
      this.isLoadingResults = false
      this.warningMessage = user.error
      console.log('error',this.warningMessage)
      this.showWarning = true
    }
    
  }

  onUpdate(update){
    this.userService.updateUser(update,this.user._id)
    .subscribe( result =>{
      console.log('after updating',result)
      if(result.isError){
        this.warningMessage = result.message
        this.showWarning = true
      }
      else{
        this.router.navigateByUrl('/users/edit')
        .then(() =>{
          this.router.navigate(['/users/view'])
        })
      }
    })
    
  }
  onDoDelete(){
    this.userService.deleteUser(this.user._id)
    .subscribe( result =>{
      if(result.isError){
        this.warningMessage = result.promptMessage
        this.showWarning = true
      }
      else{
        history.back()
      }
    })
  }

  afterSubscribing(result){
    console.log(result)
    if(result.isError){
      this.warningMessage = result.message
      this.showWarning = true
    }else{
      this.user = result  
      this.userProfileUrl = `${environment.BACKEND_BASE_URL}/files/profile/${this.user._id}?t=${UtilsService.getToken()}`
    }
    this.isLoadingResults = false
    
  }

  closeDialog(selection:boolean){
    console.log('selection',selection)
    this.showWarning = false 
  } 



}
