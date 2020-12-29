import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormControl,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Manifest } from 'src/app/models/Manifest';
import { ManifestService } from 'src/app/services/manifest/manifest.service';


@Component({
  selector: 'app-manifest-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class ManifestFormComponent implements OnInit {
  @Input() action ='create'
  @Input() originalManifestData:Manifest = {
    source: '',
    destination:''
  } //case of editing
  
  @Output() created : EventEmitter<Manifest> = new EventEmitter()
  @Output() edited : EventEmitter<Manifest> = new EventEmitter()
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
      source: new FormControl(this.originalManifestData.source?this.originalManifestData.source: '',[
        Validators.required
      ]),
      destination: new FormControl(this.originalManifestData.destination?this.originalManifestData.destination: '',[
        Validators.required
      ]),
      description: new FormControl(this.originalManifestData.description?this.originalManifestData.description: ''),
      departure: new FormControl(this.originalManifestData.departure?this.originalManifestData.departure: ''),
      arrival: new FormControl(this.originalManifestData.arrival?this.originalManifestData.arrival: ''),
      shipperName: new FormControl(this.originalManifestData.shipperName?this.originalManifestData.shipperName:'',[
        Validators.required
      ]),
      shipperContact: new FormControl(this.originalManifestData.shipperContact?this.originalManifestData.shipperContact:'')
    })
  }

  onSubmit(values){
    if(this.action == 'edit'){
      this.edited.emit(values)
    }else{
      this.created.emit(values)
    }
  }

  onCancel(){
    console.log('canceled')
    this.router.navigate(['/manifests/view'])
  }

}
