import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/services/group/group.service';

@Component({
  selector: 'app-group-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class GroupCreateComponent implements OnInit {

  showWarning:boolean = false
  warningMessage:string
  dialogAction:string = 'error'
  constructor(
    private groupsService:GroupService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(values){
    this.groupsService.createGroup(values)
    .subscribe( result =>{
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
