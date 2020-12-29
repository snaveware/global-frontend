import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorService } from 'src/app/services/change/change-detector.service';
import { ShipmentService } from 'src/app/services/shipment/shipment.service';
import { Shipment } from 'src/app/models/Shipment';

@Component({
  selector: 'app-shipment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class ShipmentHomeComponent implements OnInit {
  showWarning:boolean = false
  warnMessage:string 
  showDeletePrompt:boolean = false
  promptMessage
  shipmentToDelete:string
  dialogAction= 'error'
  isLoadingResults:boolean = true
  category:string = 'active'
  shipments:Shipment[]
  constructor(
    private shipmentService:ShipmentService,
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

    this.changeDetector.shipmentsSearched$
    .subscribe(searchResults =>{
      this.afterSubscribing(searchResults)
    })

  
  }

  getData(){
    this.shipmentService.getShipments(this.category)
    .subscribe((results:any)=>{
      this.afterSubscribing(results)
    })
    
  }

  afterSubscribing(results){
    
    if(results.isError){  
      this.warnMessage = results.message
      this.showWarning = true
      
    }else{
      this.shipments = results
    }
    this.isLoadingResults = false 
    console.log(results)
  }

  closeDialog(selection:boolean){
    console.log('selection',selection)
    this.showWarning = false 
  } 

  onDoDelete(){
    this.shipmentService.deleteShipment(this.shipmentToDelete)
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
        }, 1000);
        
      }
    })
  }

  onDelete(row){
    console.log('received delete request')
    this.shipmentToDelete = row._id
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
