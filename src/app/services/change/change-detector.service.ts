import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ChangeDetectorService {

  // Observable string sources
  private routeChanged = new Subject<string>();
  private deviceChanged = new Subject<{}>();
  private manifestsSearched = new Subject()
  private shipmentsSearched = new Subject()
  private usersSearched = new Subject()
  private groupsSearched = new Subject()

  // Observable string streams
  routeChanged$ = this.routeChanged.asObservable();
  deviceChanged$ = this.deviceChanged.asObservable();
  manifestsSearched$ = this.manifestsSearched.asObservable()
  shipmentsSearched$ = this.shipmentsSearched.asObservable()
  usersSearched$  = this.usersSearched.asObservable()
  groupsSearched$ = this.groupsSearched.asObservable()
  

  // Service message commands
  changeRoute(url: string) {
    this.routeChanged.next(url);
  }

  changeDevice(changes:{isMobile?:boolean,isDesktop?:boolean,isTablet?:boolean}){
    this.deviceChanged.next(changes)
  }

  notifyManifestsSearch(searchResults){
    this.manifestsSearched.next(searchResults)
  }

  notifyShipmentsSearch(searchResults){
    this.shipmentsSearched.next(searchResults)
  }

  notifyUsersSearch(searchResults){
    this.usersSearched.next(searchResults)
  }

  notifyGroupsSearch(searchResults){
    this.groupsSearched.next(searchResults)
  }


  
}