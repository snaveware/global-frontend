import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Group } from '../../../models/Group'
import { FormControl,FormBuilder,Validators} from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class GroupFormComponent implements OnInit {

  @Input() action ='create'
  @Input() originalGroupData:Group = {
    name:'',
    level:undefined,
    description:'',
    permissions:{
      incomplete:false,
      archived:false,
      shipments:[false,false,false,false],
      manifests:[false,false,false,false],
      users:[false,false,false,false],
      groups:[false,false,false,false],
    }
    
  } //case of editing


  @Output() created : EventEmitter<any> = new EventEmitter()
  @Output() edited : EventEmitter<any> = new EventEmitter()

  formGroup
  
  constructor(
    private formBuilder:FormBuilder,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.groupForm()
  }

  groupForm(){
    this.formGroup = this.formBuilder.group({
      name: new FormControl(this.originalGroupData.name?this.originalGroupData.name: '',[
        Validators.required
      ]),
      level: new FormControl(this.originalGroupData.level?this.originalGroupData.level:undefined,[
        Validators.required
      ]),
      description: new FormControl(this.originalGroupData.description?this.originalGroupData.description: ''),
      readShipments:this.originalGroupData.permissions.shipments[1],
      updateShipments:this.originalGroupData.permissions.shipments[2],
      createShipments:this.originalGroupData.permissions.shipments[0],
      deleteShipments:this.originalGroupData.permissions.shipments[3],
      readManifests:this.originalGroupData.permissions.manifests[1],
      updateManifests:this.originalGroupData.permissions.manifests[2],
      createManifests:this.originalGroupData.permissions.manifests[0],
      deleteManifests:this.originalGroupData.permissions.manifests[3],
      readUsers:this.originalGroupData.permissions.users[1],
      updateUsers:this.originalGroupData.permissions.users[2],
      createUsers:this.originalGroupData.permissions.users[0],
      deleteUsers:this.originalGroupData.permissions.users[3],
      readGroups:this.originalGroupData.permissions.groups[1],
      updateGroups:this.originalGroupData.permissions.groups[2],
      createGroups:this.originalGroupData.permissions.groups[0],
      deleteGroups:this.originalGroupData.permissions.groups[3],
      incomplete:this.originalGroupData.permissions.incomplete,
      archived:this.originalGroupData.permissions.archived,
    
    })
  }

  onSubmit(values){
    console.log('group values',values)
    const shipments = [
      values.createShipments,
      values.readShipments,
      values.updateShipments,
      values.deleteShipments
    ]
    const manifests = [
      values.createManifests,
      values.readManifests,
      values.updateManifests,
      values.deleteManifests
    ]
    const users  = [
      values.createUsers,
      values.readUsers,
      values.updateUsers,
      values.deleteUsers
    ]
    const groups = [
      values.createGroups,
      values.readGroups,
      values.updateGroups,
      values.deleteGroups
    ]

    const update = {
      name:values.name,
      level:values.level,
      shipments:shipments,
      manifests:manifests,
      users:users,
      groups: groups,
      incomplete :values.incomplete,
      archived:values.archived,
      description:values.description
    }

    console.log('group values',update)

    if(this.action == 'edit'){
      this.edited.emit(update)
    }else{
      this.created.emit(update)
    }

  }

  onCancel(){
    console.log('canceled')
    this.router.navigate(['/groups/view'])
  }
}
