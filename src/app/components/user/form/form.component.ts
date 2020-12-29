import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { User } from '../../../models/User'
import { FormBuilder,FormControl,Validators } from '@angular/forms'
import { Group } from 'src/app/models/Group';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/services/group/group.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class UserFormComponent implements OnInit {

  @Input() action ='create'
  @Input() originalUserData:User = {
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    branch:''
    
  } //case of editing

  @Output() created : EventEmitter<User> = new EventEmitter()
  @Output() edited : EventEmitter<User> = new EventEmitter()

  showWarning:boolean = false
  warnMessage:string
  isLoadingResults:boolean = true
  selectedGroup:string
  groups:Group[]

  formGroup
  
  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private groupService:GroupService
  ) { }

  ngOnInit(): void {
    this.groupForm()
    this.getGroups()
  }

  groupForm(){
    this.formGroup = this.formBuilder.group({
      firstName: new FormControl(this.originalUserData.firstName?this.originalUserData.firstName: '',[
        Validators.required
      ]),
      lastName: new FormControl(this.originalUserData.lastName?this.originalUserData.lastName: '',[
        Validators.required
      ]),
      email: new FormControl(this.originalUserData.email?this.originalUserData.email:'',[
        Validators.required
      ])
      ,
      password: new FormControl(this.originalUserData.password?this.originalUserData.password: '',[
        Validators.required,
        Validators.minLength(8)
      ]),
      confirmPassword: new FormControl(this.originalUserData.confirmPassword?this.originalUserData.confirmPassword: '',[
        Validators.required,
      ]),
      branch: new FormControl(this.originalUserData.branch?this.originalUserData.branch:'',[
        Validators.required
      ])
      ,
      telephone: new FormControl(this.originalUserData.telephone?this.originalUserData.telephone: ''),
      userGroup: new FormControl(this.originalUserData.userGroup?this.originalUserData.userGroup: '',[
        Validators.required
      ])
    })
  }

  onSubmit(values){
    
    if(this.action == 'edit'){
      values.password = undefined
      values._id = undefined
      values.confirmPassword = undefined
      if(this.selectedGroup){
        values['groupName'] = this.selectedGroup
      }
      this.edited.emit(values)
    }else{
      values['groupName'] = this.selectedGroup
      this.created.emit(values)
    }
    console.log('user values',values)
  }

  onCancel(){
    console.log('canceled')
    this.router.navigate(['/users/view'])
  }

  getGroups(){
    this.groupService.getGroups('all')
    .subscribe((results:any)=>{
      this.afterSubscribing(results)
    })
    
  }

  afterSubscribing(results){
    
    if(results.isError){   
      this.warnMessage = results.message
      this.showWarning = true
    }else{
      this.groups = results
    
    }
    this.isLoadingResults = false 
     
    console.log(results)
  }


}
