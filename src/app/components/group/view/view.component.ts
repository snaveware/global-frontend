import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isObservable } from 'rxjs';
import { Group } from 'src/app/models/Group';
import { GroupService } from 'src/app/services/group/group.service';

@Component({
  selector: 'app-group-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class GroupViewComponent implements OnInit {

  group:Group 
  showWarning:boolean
  warningMessage:string
  isLoadingResults:boolean = true
  action :string
  constructor(
    private router:Router,
    private groupService:GroupService,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data
    .subscribe(data =>{
      if(data && data.action){
        this.action = data.action
      }
      this.getGroup()
    })
    this.getGroup()
    console.log('group',this.group)
  }


  navigate(route){
    this.router.navigate([route])
  }


  getGroup(){
    const group = this.groupService.activeGroup
    if(isObservable(group)){
      group.subscribe(result =>{
        this.afterSubscribing(result)
      })
    }else{
      
      this.isLoadingResults = false
      this.warningMessage = group.error
      console.log('error',this.warningMessage)
      this.showWarning = true
      return
     
    }
    
  }

  onUpdate(update){
    this.groupService.updateGroup(update,this.group._id)
    .subscribe( result =>{
      if(result.isError){
        this.warningMessage = result.message
        this.showWarning = true
      }
      else{
        this.router.navigateByUrl('/groups/edit')
        .then(() =>{
          this.router.navigate(['/groups/view'])
        })
      }
    })
    
  }
  onDoDelete(){
    this.groupService.deleteGroup(this.group._id)
    .subscribe( result =>{
      if(result.isError){
        this.warningMessage = result.message
        this.showWarning = true
      }
      else{
        history.back()
      }
    })
  }

  afterSubscribing(result){
    if(result.error){
      this.warningMessage = result.message
      this.showWarning = true
    }else{
      
      this.group = result
      if(!this.group.permissions){
        this.group.permissions = {
          incomplete:false,
          archived:false,
          shipments:[false,false,false,false],
          manifests:[false,false,false,false],
          users:[false,false,false,false],
          groups:[false,false,false,false],
        }
      }
    }
    this.isLoadingResults = false
  }

  closeDialog(selection:boolean){
    console.log('selection',selection)
    this.showWarning = false 
  } 
}
