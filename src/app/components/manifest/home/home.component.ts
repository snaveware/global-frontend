import { Component, OnInit } from '@angular/core';
import { ManifestService } from 'src/app/services/manifest/manifest.service';
import { Manifest } from 'src/app/models/Manifest';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorService } from 'src/app/services/change/change-detector.service';

@Component({
  selector: 'app-manifest-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class ManifestHomeComponent implements OnInit {
  showWarning:boolean = false
  warnMessage:string 
  showDeletePrompt
  promptMessage
  manifestToDelete:string
  dialogAction= 'error'
  isLoadingResults:boolean = true
  category:string = 'active'
  manifests:Manifest[]
  constructor(
    private manifestService:ManifestService,
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

    this.changeDetector.manifestsSearched$
    .subscribe(searchResults =>{
      this.afterSubscribing(searchResults)
    })

  
  }

  getData(){
    this.manifestService.getManifests(this.category)
    .subscribe((results:any)=>{
      console.log(results)
      this.afterSubscribing(results)
    })
    
  }

  afterSubscribing(results){
    
    if(results.isError){   
      this.warnMessage = results.message
      this.dialogAction = 'error'
      this.showWarning = true
      console.log('error results')
    }else{
      this.manifests = results 
    }
    this.isLoadingResults = false 
  }

  closeDialog(selection:boolean){
    console.log('selection',selection)
     this.dialogAction = 'error'
    this.showWarning = false 
  } 

  // onLoadMore(){
    
  //   this.getData()
  //   console.log('load more from db')
  // }
  onDoDelete(){
    this.manifestService.deleteManifest(this.manifestToDelete)
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
    this.manifestToDelete = row._id
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

  onGeneratePdf(row){
    this.manifestService.generatePdf(row._id)
    .subscribe(result =>{
     this.afterGeneratingPdf(result)
    })
  }

  afterGeneratingPdf(result){
    if(!result){
      this.warnMessage = 'unknown response'
      this.showWarning = true
    }else if(result.isError){
      this.warnMessage = result.messsage
      this.showWarning = true
    }else{
      window.open(result)
    }
  }
  

}
