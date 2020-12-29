import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isObservable } from 'rxjs';
import { Manifest } from 'src/app/models/Manifest';
import { Shipment } from 'src/app/models/Shipment';
import { ShipmentService } from 'src/app/services/shipment/shipment.service';

@Component({
  selector: 'app-shipment-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ShipmentViewComponent implements OnInit {

  shipment:Shipment
  manifest:Manifest
  showWarning:boolean
  warningMessage:string
  isLoadingResults:boolean = true
  showManifestSelectionDialog:boolean = false
  showReleasePrompt:boolean = false
  showDeletePrompt:boolean = false
  promptMessage:string
  action:string
  constructor(
    private router:Router,
    private shipmentService:ShipmentService,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data
    .subscribe(data =>{
      if(data && data.action){
        this.action = data.action
      }
      this.getShipment()
    })
    
  }


  navigate(route){
    this.router.navigate([route])
  }


  getShipment(){
    const shipment = this.shipmentService.activeShipment
    if(isObservable(shipment)){
      shipment.subscribe(result =>{
        this.afterSubscribing(result)
      })
    }else{
        this.isLoadingResults = false
        this.warningMessage = shipment.error
        console.log('error',this.warningMessage)
       this.showWarning = true
     
    }
  
  }

  onUpdate(update){
    this.shipmentService.updateShipment(update,this.shipment._id)
    .subscribe( result =>{
      if(result.isError){
        this.warningMessage = result.message
        this.showWarning = true
      }
      else{
        this.router.navigateByUrl('/shipments/edit')
        .then(() =>{
          this.router.navigate(['/shipments/view'])
        })
      }
    })
    
  }
  onDoDelete(){
    this.shipmentService.deleteShipment(this.shipment._id)
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
   
    if(result.isError){
      this.warningMessage = result.message
      this.showWarning = true
    }else{
      this.shipment = result.shipment
      this.manifest = result.manifest
    }
   
    this.isLoadingResults = false
    
  }

  closeDialog(selection:boolean){
    console.log('selection',selection)
    this.showWarning = false 
  }
  
  onChangeManifest(){
    this.showManifestSelectionDialog = true
  }

  onSelectedManifest(manifest)
  {
    if(this.shipment.status.toLocaleLowerCase() != 'incomplete'){
      this.warningMessage = 'Manifest can only be changed for incomplete shipments'
      this.showWarning = true
    }else{
      this.onUpdate({manifestId:manifest._id})
    }
    console.log('selected',manifest)
    this.showManifestSelectionDialog = false
    
  }

  onOtherSelection(selection){
    console.log('selected',selection)
    this.showManifestSelectionDialog = false
  }

  onRelease(){
    this.promptMessage = 'Make sure the shipment is fully paid for  before you can release it'
    this.showReleasePrompt = true
    console.log('release')
  }

  onPdf(){
    console.log('pdf')
  }
  onEmail(){
    console.log('email')
  }

  onDelete(){
    this.promptMessage = 'Are you sure you want to permanently delete this shipment'
    this.showDeletePrompt = true
  }
  

  onReleasePrompt(selection){
   console.log('release',selection)
   this.showReleasePrompt = false
   if(selection ){
      if(this.manifest.status == 'arrived'){
        this.onUpdate({picked:true})
      }else{
        this.warningMessage = 'Check if the shipment has arrived yet'
        this.showWarning = true
      }
    
   }
   
  }

  onDeletePrompt(selection){
    console.log('delete',selection)
    this.showDeletePrompt = false
    if(selection){
      this.onDoDelete()
    }
  }


  

}
