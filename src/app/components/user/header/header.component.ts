import { Component, OnInit,OnDestroy, Input, ViewChild } from '@angular/core';
import { ChangeDetectorService } from 'src/app/services/change/change-detector.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class UserHeaderComponent implements OnInit {
  mobile:boolean = false
  deviceChangedSubscription
  @Input() userNames
  @Input() userProfileUrl
  @Input() userGroup
  @Input() userId
  @ViewChild('upload') upload 
  showProfile:boolean = true
  constructor(
    private changeDetectorService:ChangeDetectorService,
    private userService:UserService
  ) { 
    this.deviceChangedSubscription = this.changeDetectorService.deviceChanged$
    .subscribe((changes:{isMobile:boolean}) =>{
      
      if(changes.isMobile){
        this.mobile = true
      }else{
        this.mobile = false
      }
    })
  }

  ngOnDestroy(){
    this.deviceChangedSubscription.unsubscribe()
  }

  ngOnInit(): void {
    this.mobile =  matchMedia('(max-width:600px)').matches 
    console.log(this.mobile) 
  }
  onUpload(file){
    console.log(file)
    this.userService.uploadProfile(this.userId,file)
    .subscribe( result =>{
      if(!result){
        console.log('unknown response')
      }
      if(result.isError){
        console.log(result.message)
      }else{
        location.reload()
      }
    })
  }
  onChangeProfile(){

    this.upload.nativeElement.click()
  }

}
