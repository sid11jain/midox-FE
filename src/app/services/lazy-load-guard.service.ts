import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment } from '@angular/router';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class LazyLoadGuardService implements CanLoad {
  loggerToken:any;
  constructor(private common: CommonService, private router:Router){
    
    
  }
  canLoad(route: Route, segments: UrlSegment[]): boolean {
    this.loggerToken = <string>sessionStorage.getItem('token');
    // Your logic to check user access
    const userHasAccess:any = this.loggerToken?true:false;
    // console.log('logger', this.loggerToken);
    // console.log('userHasAccess', userHasAccess);
    
    if (!userHasAccess) {
      alert('Please login to access!');
      sessionStorage.clear();
      this.router.navigate(['/login']);
    }
    return userHasAccess;
  }
}
