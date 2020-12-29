import {OnInit,AfterViewInit, Component, ViewChild, Input, Output, EventEmitter,OnChanges} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
//import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { Group } from 'src/app/models/Group';
import { GroupService } from 'src/app/services/group/group.service';

@Component({
  selector: 'app-group-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class GroupTableComponent implements OnInit {

  displayedColumns = ['name','level']
  dataSource: MatTableDataSource<Group>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  //@ViewChild(MatSort) sort: MatSort;
  @Input() display = 'home'
  @Input() groups:Group[] = []
  @Output() selected:EventEmitter<Group> = new EventEmitter()
  @Output() delete:EventEmitter<Group> = new EventEmitter
  constructor(
    private router:Router,
    private groupService:GroupService
  ) { 
    if(this.display == 'home'){
      this.displayedColumns.push('actions')
    }
    this.dataSource = new MatTableDataSource();

  }

  ngOnInit(): void {
    this.dataSource.data = this.groups
  }

  ngOnChanges(changes){
    console.log(changes)
    if(changes.groups && this.dataSource){
      this.dataSource.data = changes.groups.currentValue
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
    this.groupService.activeGroupId = row._id
    this.router.navigate(['/groups/view'])
    console.log('view',row)
  }
  onEdit(row){
    this.groupService.activeGroupId = row._id
    this.router.navigate(['/groups/edit'])
    console.log('edit',row)
  }
  onDelete(row){ 
    this.delete.emit(row)
  }


}
