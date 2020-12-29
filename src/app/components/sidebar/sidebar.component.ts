import { Component, Input, OnInit ,OnChanges, ViewChild, Output,OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ChangeDetectorService } from 'src/app/services/change/change-detector.service';
import { UtilsService } from '../../services/utils/utils.service'
import { environment } from '../../../environments/environment'
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  showSidebarUserActions:boolean = false
  @Input() showSidebar:boolean = true
  @ViewChild('sidenav') sidenav
  loggedIn = false
  activePath = ''
  routeChangedSubscription
  deviceChangedSubscription
  loggedInSubscription
  matchedMobile:boolean = false
  collection
  userId = UtilsService.getId()
  userNames = UtilsService.getNames()
  userProfileUrl = `${environment.BACKEND_BASE_URL}/files/profile/${this.userId}?t=${UtilsService.getToken()}`

  constructor(
    private changeDetectorService:ChangeDetectorService,
    private router:Router,
    private authService:AuthService,
    private userService:UserService
  ) { 

    this.routeChangedSubscription = this.changeDetectorService.routeChanged$
    .subscribe( (url :string) =>{

      const path = UtilsService.extractPath(url)
      this.activePath = path
      this.determineCollection(this.activePath)
    })

    this.deviceChangedSubscription = this.changeDetectorService.deviceChanged$
    .subscribe((changes:{isMobile:boolean}) =>{
      console.log('device changed',changes)
      if(changes.isMobile){
        this.matchedMobile = true
      }else{
        this.matchedMobile = false
      }
      console.log('matched mobile',this.matchedMobile)
    })
  }

  ngOnInit(): void {
    console.log('user profile',this.userProfileUrl)
    if(UtilsService.checkInitialLoginStatus()){
      this.loggedIn = true
    }
    this.matchedMobile =  matchMedia('(max-width:600px)').matches  
    this.loggedInSubscription =  this.authService.isLoggedIn$.subscribe((isloggedIn:boolean)=>{
      console.log('sidebar new login status',isloggedIn)
      if(isloggedIn){
        this.loggedIn = true
      }
      else{
        this.loggedIn = false
      }
    })
  }

  ngOnChanges(changes: { [property: string]:any  }){
    
    if(this.sidenav && changes.showSidebar){
      this.toggleSidebar()
    }
  }
  ngOnDestroy(){
    this.routeChangedSubscription.unsubscribe()
    this.deviceChangedSubscription.unsubscribe()
    this.loggedInSubscription.unsubscribe()
  }

  

  onShowSidebarUserActions(){
    if(!this.showSidebarUserActions){
      this.showSidebarUserActions = true
      return
    }
    this.showSidebarUserActions = false
  }
 
  toggleSidebar(){
    if(this.showSidebar){
      this.sidenav.open()
    }else{
      this.sidenav.close()
    }
  }


  onActivateTab(tab){
    this.router.navigate([`/${tab}`])
    this.activePath = tab
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

  determineCollection(route){
    if(route.indexOf('manifests') != -1){
      this.collection ='manifests'
    }else if(route.indexOf('shipments') != -1){
      this.collection = 'shipments'
    }else if(route.indexOf('users') != -1){
      this.collection = 'users'
    }else if(route.indexOf('groups') != -1){
      this.collection == 'groups'
    }else{
      this.collection = undefined
    }
  }

 onSearch(value){
  
   const path = `/${this.activePath}`
   this.router.navigateByUrl('/')
   .then( ()=>{
    console.log('path',path)
    console.log('value',value)
     this.router.navigateByUrl(`${path}?s=${value}`)
   })
 }

}
