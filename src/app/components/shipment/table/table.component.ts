import {OnInit,AfterViewInit, Component, ViewChild, Input, Output, EventEmitter,OnChanges} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
//import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { Shipment } from 'src/app/models/Shipment';
import { ShipmentService } from 'src/app/services/shipment/shipment.service';

@Component({
  selector: 'app-shipment-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class ShipmentTableComponent implements OnInit {

  @Input() displayedColumns = ['id','title','customer','telephone','CBM','cost','paid','currency','status']
  dataSource: MatTableDataSource<Shipment>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  //@ViewChild(MatSort) sort: MatSort;
  @Input() display = 'home'
  @Input() shipments:Shipment[] = []
  @Output() selected:EventEmitter<Shipment> = new EventEmitter()
  @Output() delete:EventEmitter<Shipment> = new EventEmitter()
  constructor(
    private router:Router,
    private shipmentService:ShipmentService
  ) { 

  }

  ngOnInit(): void {
    console.log('display',this.display)
    if(this.display == 'home'){
      this.displayedColumns.push('actions')
    }
    this.dataSource = new MatTableDataSource()

    this.dataSource.data = this.shipments
  }

  ngOnChanges(changes){
    
    if(changes.shipments && this.dataSource ){
      this.dataSource.data = changes.shipments.currentValue
    }
    if(changes.display && changes.display.simpleChanges){
      this.display = changes.display.simpleChanges.currentValue
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
      console.log('selected',row)
    }
    
  }
  onView(row){
    this.shipmentService.activeShipmentId = row._id
    this.router.navigate(['/shipments/view'])
    console.log('view',row)
  }

  onEdit(row){
    this.shipmentService.activeShipmentId = row._id
    this.router.navigate(['/shipments/edit'])
    console.log('edit',row)
  }
  onDelete(row){ 
    this.delete.emit(row)
    console.log('sent delete request')
  }

}
