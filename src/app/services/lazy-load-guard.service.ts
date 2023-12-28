import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment } from '@angular/router';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class LazyLoadGuardService implements CanLoad {
  loggerToken:any;
  constructor(private common: CommonService){
    this.loggerToken = sessionStorage.getItem('token');
    
  }
  canLoad(route: Route, segments: UrlSegment[]): boolean {
    // Your logic to check user access
    const userHasAccess:any = this.loggerToken?true:false;
    // console.log('logger', this.loggerToken);
    // console.log('userHasAccess', userHasAccess);
    
    if (!userHasAccess) {
      //alert('Please login to access!');

    }
    return true;
  }
}
