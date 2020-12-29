import { Component,OnInit,Input, EventEmitter,Output,ChangeDetectorRef,OnDestroy,OnChanges } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { ChangeDetectorService } from './services/change/change-detector.service';
import {MediaMatcher} from '@angular/cdk/layout';
import { AuthService } from './services/auth/auth.service';
import { UtilsService } from './services/utils/utils.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  load:boolean = false
  loggedIn = false
  showSidebar = true
  isDark:boolean = false
  tab
  pageDescription
  page
  @Output() toggleSidebar:EventEmitter<any> = new EventEmitter()

  mobileQuery: MediaQueryList;
  loggedInSubscription 
  private _mobileQueryListener: () => void;

  constructor(
    private router:Router,
    private changeDetectorService:ChangeDetectorService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private authService:AuthService
  ){
    this.router.events.subscribe((event:RouterEvent)=>{
      if(event instanceof NavigationStart){
        this.load = true

      }
      if(event instanceof NavigationEnd){
        this.changeDetectorService.changeRoute(event.url)
        this.prepareBannerData(event.url)
        setTimeout(() => {
          this.load = false
        }, 1000);
      }

    })

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', e =>{
      console.log('changes',e)
      if(e.matches){
        this.changeDetectorService.changeDevice({isMobile:true})
      }else{
        this.changeDetectorService.changeDevice({isMobile:false})
      }
     
    });

    this.loggedInSubscription =  this.authService.isLoggedIn$.subscribe((isloggedIn:boolean)=>{
      console.log('app subscribed and checking if logged in')
      if(isloggedIn){
        this.loggedIn = true
      }
      else{
        
        this.loggedIn = false  
      }
      console.log('after checking',this.loggedIn)
    })
  }
  ngOnInit(){
    if(UtilsService.checkInitialLoginStatus())
    {
      this.loggedIn = true
    }
    else{
      this.authService.isLoggedIn ={state:false,details:null}
    }
  }
  

  ngOnChanges(changes: { [property: string]:any  }){
    console.log('app changes',changes)
  }

  ngOnDestroy(): void {
    this.loggedInSubscription.unsubscribe()
    this.mobileQuery.removeListener(this._mobileQueryListener);
    
  }
  onHasLoggedout(){
    console.log('on as logged out')
  }

  onToggleDarkMode():void {
    this.isDark = !this.isDark
  }
  

  onToggleSidebar(element){
    this.showSidebar = !this.showSidebar
  }

  prepareBannerData(url:string){
    url = `/${UtilsService.extractPath(url)}`
    switch (url) {
      case '/' :
        this.fillBannerData('dashboard',null,'welcome John doe')
        break;

      case '/manifests' :
        this.fillBannerData('manifests','active','all active manifests')
        break;
      case '/manifests/new' :
        this.fillBannerData('manifests','new','create new manifest')
        break;
      case '/manifests/view' :
        this.fillBannerData('manifests','view','View manifest')
        break;
      case '/manifests/edit' :
        this.fillBannerData('manifests','edit','edit manifest')
        break;
      case '/manifests/arrived' :
        this.fillBannerData('manifests','arrived','Manifest whose shipments have arrived')
        break;
      case '/manifests/shipping' :
        this.fillBannerData('manifests','shipping','manifests whose shipments are currently being shipped')
        break;
      case '/manifests/incomplete' :
        this.fillBannerData('manifests','incomplete',' manifests still in preparation')
      break;
      case '/manifests/archived' :
        this.fillBannerData('manifests','archived','archived manifests')
      break;

      case '/shipments' :
        this.fillBannerData('shipments','active','all active shipments')
        break;
      case '/shipments/new' :
        this.fillBannerData('shipments','new','create new shipment')
        break;
      case '/shipments/view' :
        this.fillBannerData('shipments','view','View shipment')
        break;
      case '/shipments/edit' :
        this.fillBannerData('shipments','edit','edit shipment')
        break;
      case '/shipments/arrived' :
        this.fillBannerData('shipments','arrived','shipments ready for collection')
        break;
      case '/shipments/shipping' :
        this.fillBannerData('shipments','shipping','shipments currently being shipped')
        break;
      case '/shipments/incomplete' :
      this.fillBannerData('shipments','incomplete','shipments whose manifest is still in preparation')
      break;
      case '/shipments/archived' :
        this.fillBannerData('shipments','archived','archived shipments')
      break;
      case '/users' :
        this.fillBannerData('users','all','all users')
        break;
      case '/users/new' :
        this.fillBannerData('users','new','create new user')
        break;

      case '/users/view' :
        this.fillBannerData('users','view','View user')
        break;
      case '/users/edit' :
        this.fillBannerData('users','edit','edit user')
        break;
      case '/users/active' :
        this.fillBannerData('users','active','active users')
        break;
      case '/users/profile' :
        this.fillBannerData('users','Profile','My Profile')
        break;
      case '/users/locked' :
        this.fillBannerData('users','locked','locked accounts')
        break;
      case '/groups' :
        this.fillBannerData('groups','all','all groups')
        break;
      case '/groups/new':
        this.fillBannerData('groups','new','create new user group')
        break;

      case '/groups/view' :
        this.fillBannerData('groups','view','View group')
        break;
      case '/groups/edit' :
        this.fillBannerData('groups','edit','edit group')
        break;
      default:
        this.fillBannerData('dashboard',null,'welcome John doe')
        break;
    }
  }

  fillBannerData(tab,page,description){
    this.tab = tab
    this.page = page
    this.pageDescription = description
  }


 
}
