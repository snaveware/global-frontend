import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorService } from 'src/app/services/change/change-detector.service';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class UserHomeComponent implements OnInit {

  showWarning:boolean = false
  warnMessage:string 

  showDeletePrompt:boolean = false
  promptMessage
  userToDelete:string
  dialogAction= 'error'

  isLoadingResults:boolean = true
  category:string = 'active'
  users:User[]
  constructor(
    private userService:UserService,
    private activatedRoute:ActivatedRoute,
    private changeDetector:ChangeDetectorService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data
    .subscribe(data =>{
      if(data && data.category){
        this.category = data.category
      }
      this.getData()
    })

    this.changeDetector.usersSearched$
    .subscribe(searchResults =>{
      this.afterSubscribing(searchResults)
    })

  
  }

  getData(){
    this.userService.getUsers(this.category)
    .subscribe((results:any)=>{
      this.afterSubscribing(results)
    })
    
  }

  afterSubscribing(results){
    
    if(results.isError){ 
      this.warnMessage = results.message
      this.showWarning = true
        
    }else{
      this.users = results 
    }
    this.isLoadingResults = false 
    console.log(results)
  }

  closeDialog(selection:boolean){
    console.log('selection',selection)
    this.showWarning = false 
  } 


  onDoDelete(){
    this.userService.deleteUser(this.userToDelete)
    .subscribe( result =>{
      console.log('after delete',result)
      if(result.isError){
        this.warnMessage = result.message
        this.dialogAction = 'error'
        this.showWarning = true
      }
      else{
        this.warnMessage = 'Deletion successful'
        this.dialogAction = 'success'
        this.showWarning = true
        this.ngOnInit()
        const timeout = setTimeout(() => {
          this.showWarning = false
          clearTimeout(timeout)
        }, 5000);
        
      }
    })
  }

  onDelete(row){
    console.log('received delete request')
    this.userToDelete = row._id
    this.promptMessage = 'Are you sure you want to permanently delete this shipment'
    this.showDeletePrompt = true
  }

  onDeletePrompt(selection){
    console.log('delete',selection)
    this.showDeletePrompt = false

    if(selection){
      this.onDoDelete()
    }
  }
}
