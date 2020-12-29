import { Component, OnInit } from '@angular/core';
import { ShipmentService } from 'src/app/services/shipment/shipment.service';

@Component({
  selector: 'app-shipment-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class ShipmentCreateComponent implements OnInit {
  showWarning:boolean = false
  warningMessage:string
  dialogAction:string = 'error'
  constructor(
    private shipmentsService:ShipmentService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(values){
    this.shipmentsService.createShipment(values)
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
