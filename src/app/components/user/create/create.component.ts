import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class UserCreateComponent implements OnInit {

  showWarning:boolean = false
  warningMessage:string
  dialogAction:string = 'error'
  constructor(
    private usersService:UserService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(values){
    this.usersService.createUser(values)
    .subscribe( result =>{
      if(!result){
        this.warningMessage= 'unknown response. please contact the admin'
       this.dialogAction = 'error'
       this.showWarning = true
      }
     if(result.isError){
       this.warningMessage= result.message
       this.dialogAction = 'error'
       this.showWarning = true
     }else{
        this.warningMessage= 'created successfully'
        this.dialogAction = 'success'
        this.showWarning = true
        const timeout =  setTimeout(() => {
          this.showWarning = false
          clearTimeout(timeout)
        }, 5000);
      }
    })
    
  }

  closeDialog(selection){
    this.showWarning = false
  }

}
