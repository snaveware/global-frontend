import { Component, EventEmitter, OnInit ,Output,Input,ViewChild} from '@angular/core';
import {Observable,of} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { FormControl,Validators } from '@angular/forms'
import { UserService } from '../../services/user/user.service'

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {
  @Output() send:EventEmitter<any> = new EventEmitter()
  @Output() cancel:EventEmitter<any> = new EventEmitter()
  emails:string[] = []
  emailControl = new FormControl('',[Validators.required,Validators.email])
  filteredEmails:Observable<string[]> = of([])
  constructor(
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.findEmails()
    
  }

  onSubmit(values){
    this.send.emit(values)
  }
  onCancel(){
    this.cancel.emit('cancel')
  }

  _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.emails.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  findEmails(){
    this.userService.findEmails()
    .subscribe( result =>{
      console.log(result)
      if(result.isError){
        console.log(result.message)
      }else{
        this.emails = result
        this.filteredEmails = this.emailControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value.toString()))
        );
      }

    })
  }

}
