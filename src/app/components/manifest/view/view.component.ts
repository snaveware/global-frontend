import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { isObservable } from 'rxjs';
import { Manifest } from 'src/app/models/Manifest';
import { Shipment } from 'src/app/models/Shipment';
import { ManifestService } from 'src/app/services/manifest/manifest.service'
import { ActivatedRoute } from '@angular/router';
import { ShipmentService } from 'src/app/services/shipment/shipment.service';

@Component({
  selector: 'app-manifest-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ManifestViewComponent implements OnInit {

  manifest:Manifest
  shipments:Shipment[]
  showWarning:boolean
  warningAction:string = 'error'
  warningMessage:string
  isLoadingResults:boolean = true
  showShipmentsSelectionDialog:boolean = false
  showManifestSelectionDialog:boolean = false
  showDeletePrompt:boolean = false
  promptMessage:string
  action:string
  loading:boolean = false
  prepareEmail:boolean = false
  constructor(
    private router:Router,
    private manifestService:ManifestService,
    private activatedRoute:ActivatedRoute,
    private shipmentService:ShipmentService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data
    .subscribe(data =>{
      if(data && data.action){
        this.action = data.action
      }
      console.log('subscribed')
      this.getManifest()
    })
    
  }


  // navigate(route){
  //   this.router.navigate([route])
  // }


  getManifest(){
    const manifest = this.manifestService.activeManifest
    if(isObservable(manifest)){
      manifest.subscribe(result =>{
        console.log('result',result)
        this.afterSubscribing(result)
      })
      
    }else{ 
      this.isLoadingResults = false
      this.warningMessage = manifest.error
      this.warningAction = 'error'
      console.log('error',this.warningMessage)
      this.showWarning = true
      return
    }
    
  }

  onUpdate(update){
    this.manifestService.updateManifest(update,this.manifest._id)
    .subscribe( result =>{
      console.log('after update',result)
      if(result.isError){
        this.warningMessage = result.message
        this.warningAction = 'error'
        this.showWarning = true
      }
      else{
        this.router.navigateByUrl('/manifests/edit')
        .then(() =>{
          this.router.navigate(['/manifests/view'])
        })
      }
    })
    
  }
  onDoDelete(){
    this.manifestService.deleteManifest(this.manifest._id)
    .subscribe( result =>{
      console.log('after delete',result)
      if(result.isError){
        this.warningMessage = result.message
        this.warningAction = 'error'
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
      this.warningAction = 'error'
      this.showWarning = true
    }else{
      result.manifest.departureLocal =result.manifest.departure == ''?'': new Date(result.manifest.departure).toString()
      result.manifest.arrivalLocal =result.manifest.arrival == ''?'': new Date(result.manifest.arrival).toString()
      this.manifest =   result.manifest
      this.shipments = result.shipments
    }

    this.isLoadingResults = false
    
  }

  closeDialog(selection:boolean){
    console.log('selection',selection)
    this.showWarning = false 
  } 

  onAddShipment(){
    this.showShipmentsSelectionDialog= true
    console.log('add Shipment')
  }

  onSelectedShipment(shipment){
    if(this.manifest.status.toLocaleLowerCase() != 'incomplete'){
      this.warningMessage = 'Shipments can only be added to incomplete manifests'
      this.warningAction = 'error'
      this.showWarning = true
    }else{
      this.shipmentService.updateShipment({manifestId:this.manifest._id},shipment._id)
      .subscribe(result =>{
        if(!result){
          this.warningMessage = 'unknown response'
          this.warningAction = 'error'
          this.showWarning = true
        }
        if(result.isError){
          this.warningMessage = result.message
          this.showWarning = true
        }else{
          this.ngOnInit()
          this.warningMessage = 'added successfully'
          this.warningAction = 'success'
          this.showWarning = true
          
        }
      })
    }
    this.showManifestSelectionDialog = false
    this.showShipmentsSelectionDialog = false
    console.log('selected Shipment',shipment)
  }
  onOtherSelection(selection){
    this.showShipmentsSelectionDialog = false
  }

  onComplete(){
    if(this.shipments.length>0){
      this.onUpdate({status:'complete'})
    }else{
      this.warningMessage = 'Cannot ship an empty manifest'
      this.warningAction = 'error'
      this.showWarning = true
    }
    console.log('complete')
  }

  onArrived(){
    if(this.manifest.status == 'complete'){
      this.onUpdate({status:'arrived'})
    }else{
      this.warningMessage = "Looks like the manifest was not in shipping"
      this.warningAction = 'error'
      this.showWarning = true
    } 
    console.log('arrived')
  }

  onGeneratePdf(){
    this.manifestService.generatePdf(this.manifest._id)
    .subscribe(result =>{
     this.afterGeneratingPdf(result)
    })
  }

  afterGeneratingPdf(result){
    if(!result){
      this.warningMessage = 'unknown response'
      this.showWarning = true
    }else if(result.isError){
      this.warningMessage = result.messsage
      this.showWarning = true
    }else{
      window.open(result)
    }
  }

  onEmail(){
    this.prepareEmail = true
  }

  cancelEmail(){
    this.prepareEmail = false
  }

  sendEmail(params){
    this.loading = true
    this.manifestService.sendEmail(this.manifest._id,params)
    .subscribe( result =>{
      this.afterSendingEmail(result)
    })
    console.log('email',params)  
  }
  afterSendingEmail(result){
    if(!result){
      this.warningMessage = 'unknown response'
      this.warningAction = 'error'
      this.showWarning = true
    }else if(result.isError){
      this.warningAction = 'error'
      this.showWarning = true
      this.warningMessage  = result.message
    }else{
      this.warningMessage = 'sent successfully'
      this.warningAction = 'success'
      this.showWarning = true
    }
    this.prepareEmail = false
    this.loading = false
  }
  
  onDelete(){
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
