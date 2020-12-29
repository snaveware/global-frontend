import { Component, OnInit,Input, Output, EventEmitter, ViewChild,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  @Output() toggleSidebar:EventEmitter<string> = new EventEmitter()
  isFullscreen:boolean = false
  showTopbarUserActions:boolean = false
  loggedIn:boolean = false
  loggedInSubscription
  userId = UtilsService.getId()
  userNames = UtilsService.getNames()
  userProfileUrl = `${environment.BACKEND_BASE_URL}/files/profile/${this.userId}?t=${UtilsService.getToken()}`

  constructor(
    private authService:AuthService,
    private router:Router,
    private userService:UserService
  ) { }

  ngOnInit(): void {

    if(UtilsService.checkInitialLoginStatus()){
      this.loggedIn = true
    }

    this.loggedInSubscription =  this.authService.isLoggedIn$.subscribe((isloggedIn:boolean)=>{
      console.log('topbar new login status',isloggedIn)
      if(isloggedIn){
        this.loggedIn = true
      }
      else{
        this.loggedIn = false
      }
    })
  }
  ngOnDestroy(){
    this.loggedInSubscription.unsubscribe()
  }
  
  onToggleFullscreen(){
    const elem = document.documentElement
    if(!this.isFullscreen){
      elem.requestFullscreen()
      // if (elem.requestFullscreen) {
      //   elem.requestFullscreen();
      // } else if (elem.webkitRequestFullscreen) { /* Safari */
      //   elem.webkitRequestFullscreen();
      // } else if (elem.msRequestFullscreen) { /* IE11 */
      //   elem.msRequestFullscreen();
      // }
      this.isFullscreen = true
    }else{
      document.exitFullscreen()
      this.isFullscreen  =false
      // if (document.exitFullscreen) {
      //   document.exitFullscreen();
      // } else if (document.webkitExitFullscreen) { /* Safari */
      //   document.webkitExitFullscreen();
      // } else if (document.msExitFullscreen) { /* IE11 */
      //   document.msExitFullscreen();
      // }
    }

   
    
  }

  onShowTopbarUserActions(){
    if(!this.showTopbarUserActions){
      this.showTopbarUserActions = true
      return
    }
    this.showTopbarUserActions = false
  }
  

  onToggleSidebar(){
    this.toggleSidebar.emit('sidebar')
  }

  onMyAccount(){
    this.userService.activeUserId = UtilsService.getId()
    this.router.navigateByUrl('/')
    .then(() =>{
      this.router.navigateByUrl('/users/view')
    })
  }


  onLogout(){
    console.log('logout')
    this.authService.isLoggedIn = {state:false,details:null}

  }


}
