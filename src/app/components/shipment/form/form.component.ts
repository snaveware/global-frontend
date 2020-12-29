import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Shipment } from '../../../models/Shipment'
import { FormBuilder,FormControl,Validators } from '@angular/forms'
import { Manifest } from 'src/app/models/Manifest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipment-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class ShipmentFormComponent implements OnInit {

  @Input() action ='create'
  @Input() originalShipmentData:Shipment = {
    title: '',
    CBM:0,
    customerName:'',
    amountPaid:0,
    totalCost:0,
    currency:'USD',
    
  } //case of editing

  @Output() created : EventEmitter<Shipment> = new EventEmitter()
  @Output() edited : EventEmitter<Shipment> = new EventEmitter()

  selectedManifest:string //the id
  showManifestSelectionDialog:boolean = false
  manifests: Array<Manifest> 
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
      title: new FormControl(this.originalShipmentData.title?this.originalShipmentData.title: '',[
        Validators.required
      ]),
      CBM: new FormControl(this.originalShipmentData.CBM?this.originalShipmentData.CBM: 0,[
        Validators.required
      ]),
      totalCost: new FormControl(this.originalShipmentData.totalCost?this.originalShipmentData.totalCost: 0,[
        Validators.required
      ])
      ,
      amountPaid: new FormControl(this.originalShipmentData.amountPaid?this.originalShipmentData.amountPaid: 0,[
        Validators.required
      ]),
      currency: new FormControl(this.originalShipmentData.currency?this.originalShipmentData.currency:'USD',[
        Validators.required
      ])
      ,
      description: new FormControl(this.originalShipmentData.description?this.originalShipmentData.description: ''),
      customerName: new FormControl(this.originalShipmentData.customerName?this.originalShipmentData.customerName:'',[
        Validators.required
      ]),
      customerTelephone: new FormControl(this.originalShipmentData.customerTelephone?this.originalShipmentData.customerTelephone: '')

    })
  }

  onSubmit(values){
    if(this.action == 'edit'){
      this.edited.emit(values)
    }else{
      values.manifestId = this.selectedManifest
      this.created.emit(values)
    }
    console.log('shipment values',values)
  }

  onCancel(){
    console.log('canceled')
    this.router.navigate(['/shipments/view'])
  }

  onChangeManifest(){
    this.showManifestSelectionDialog = true
  }

  onSelectedManifest(manifest)
  {
    
    console.log('selected',manifest)
    this.selectedManifest = manifest._id
    this.showManifestSelectionDialog = false
  }

  onOtherSelection(selection){
    console.log('selected',selection)
    this.showManifestSelectionDialog = false
  }

}
