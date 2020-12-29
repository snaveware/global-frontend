import { Component, OnInit } from '@angular/core';
import { ManifestService } from 'src/app/services/manifest/manifest.service';

@Component({
  selector: 'app-manifest-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class ManifestCreateComponent implements OnInit {
  showWarning:boolean = false
  warningMessage:string
  dialogAction:string = 'error'
  constructor(
    private manifestsService:ManifestService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(values){
    this.manifestsService.createManifest(values)
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
