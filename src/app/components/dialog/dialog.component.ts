import { Component, OnInit, Input, Output, EventEmitter,OnChanges } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Manifest } from 'src/app/models/Manifest';
import { Shipment } from 'src/app/models/Shipment';
import { ManifestService } from 'src/app/services/manifest/manifest.service';
import { ShipmentService } from 'src/app/services/shipment/shipment.service';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  @Input() action:string = 'error'
  @Input() message:string
  @Output() selected:EventEmitter<boolean> = new EventEmitter() 
  @Output() selectedManifest:EventEmitter<Manifest> = new EventEmitter()
  @Output() selectedShipment:EventEmitter<Shipment> = new EventEmitter()
  shipments
  manifests
  isLoadingResults:boolean
  showError:boolean = false
  shipmentsDisplayedColumns = ['id','title','customer','telephone','CBM']
  constructor(
    private dialog:MatDialog,
    private shipmentService:ShipmentService,
    private manifestService:ManifestService
  ) {}

  ngOnInit(): void {

    if(this.action == 'shipments'){
      this.isLoadingResults = true
      this.getShipments()
    }else if(this.action == 'manifests'){
      this.isLoadingResults = true
      this.getManifests()
    }
  }

  ngOnChanges(changes):void{
    console.log('dialog changes',changes)
  }

  onSelect(value){
    this.selected.emit(value)
  }

  onSelectManifest(manifest:Manifest){
    this.selectedManifest.emit(manifest)
  }

  onSelectShipment(shipment:Shipment){
    this.selectedShipment.emit(shipment)
  }

  getManifests(){
    this.manifestService.getManifests('incomplete')
    .subscribe(results =>{
      if(results.isError){   
        this.message = results.message
        this.showError = true
        console.log('error results')
        
      }else{
        this.manifests = results
      }
      this.isLoadingResults = false 
      console.log(results)
    })
  }

  getShipments(){
    this.shipmentService.getShipments('incomplete')
    .subscribe(results =>{
      if(results.isError){   
        this.message = results.message
        this.showError = true
        
      }else{
        this.shipments = results
      }
      this.isLoadingResults = false 
      console.log(results)
      
    })
  }


}

