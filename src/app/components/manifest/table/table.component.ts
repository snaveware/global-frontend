import {OnInit,AfterViewInit, Component, ViewChild, Input, Output, EventEmitter,OnChanges} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Manifest } from 'src/app/models/Manifest';
import { Router } from '@angular/router';
import { ManifestService } from 'src/app/services/manifest/manifest.service';

@Component({
  selector: 'app-manifest-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class ManifestTableComponent implements OnInit {
  @Input() displayedColumns = ['id','source','destination','branch','carrier','status']
  dataSource: MatTableDataSource<Manifest>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  //@ViewChild(MatSort) sort: MatSort;
  @Input() mode = "normal"
  @Input() display = 'home'
  @Input() manifests:Manifest[] = []
  @Output() selected:EventEmitter<Manifest> = new EventEmitter()
  @Output() delete:EventEmitter<Manifest> = new EventEmitter()
  @Output() generatePdf:EventEmitter<Manifest> = new EventEmitter()
  constructor(
    private router:Router,
    private manifestsService:ManifestService
  ) { 

  }

  ngOnInit(): void {
    if(this.display == 'home'){
      this.displayedColumns.push('actions')
    }
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.manifests
  }

  ngOnChanges(changes){
    console.log(changes)
    if(changes.manifests && this.dataSource){
      this.dataSource.data = changes.manifests.currentValue
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSelect(row){
    if(this.display == 'select'){
      this.selected.emit(row)
    }
    
  }
  onView(row){
   // this.manifestsService.activeManifest = row
   this.manifestsService.activeManifestId = row._id
    this.router.navigate(['/manifests/view'])
    console.log('view',row)
  }

  onEdit(row){
    this.manifestsService.activeManifestId = row._id
    this.router.navigate(['/manifests/edit'])
    console.log('edit',row)
  }
  
  onGenPdf(row){
    this.generatePdf.emit(row)
  }
  onDelete(row){
    this.delete.emit(row)
  }


}
