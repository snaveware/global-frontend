import {OnInit,AfterViewInit, Component, ViewChild, Input, Output, EventEmitter,OnChanges} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class UserTableComponent implements OnInit {

  displayedColumns = ['firstName','lastName','email','group','status','telephone']
  dataSource: MatTableDataSource<User>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  //@ViewChild(MatSort) sort: MatSort;
  @Input() display = 'home'
  @Input() users:User[] = []
  @Output() selected:EventEmitter<User> = new EventEmitter()
  @Output() delete:EventEmitter<User> = new EventEmitter()
  constructor(
    private router:Router,
    private userService:UserService
  ) { 
    if(this.display == 'home'){
      this.displayedColumns.push('actions')
    }
    this.dataSource = new MatTableDataSource();

  }

  ngOnInit(): void {
    this.dataSource.data = this.users
  }

  ngOnChanges(changes){
    console.log(changes)
    if(changes.users && this.dataSource){
      this.dataSource.data = changes.users.currentValue
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
    this.userService.activeUserId = row._id
    this.router.navigate(['/users/view'])
    console.log('edit',row)
  }

  onEdit(row){
    this.userService.activeUserId = row._id
    this.router.navigate(['/users/edit'])
    console.log('edit',row)
  }

  onDelete(row){ 
    this.delete.emit(row)
  }

}
