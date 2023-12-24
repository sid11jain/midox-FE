import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  loggerToken:any;
  subscriber: any;
  constructor(private common: CommonService) {
    // common.loginToken.subscribe((val:any) => {
    //   this.loggerToken = val;
    // });
    this.loggerToken = localStorage.getItem('token');
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     //add auth header with bearer token if account is logged in and request is to the api url
     const isApiUrl = request.url.startsWith(environment.apiEndpoint);
     if (this.loggerToken && isApiUrl) {
        request = request.clone({
             setHeaders: { Authorization: `Bearer ${this.loggerToken}` }
        });
     }

     return next.handle(request);
  }

  // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<httpevent<any>> {
  //   // if (!request.url.startsWith(environment.apiUrl + '/secure')) {
  //   // console.log("Url not secure", request)
  //   // return next.handle(request)
  //   // }
  //   if (!this.authService.user) {
  //   console.log("User not logged in.")
  //   return next.handle(request)
  //   }
  //   return from(this.authService.user.getIdToken())
  //   .pipe(
  //   switchMap(token => {
  //   const headers = request.headers
  //   .set('Authorization', 'Bearer ' + token)
  //   .append('Content-Type', 'application/json');
  //   const requestClone = request.clone({
  //   headers
  //   });
  //   console.log("header set with token: ", token)
  //   return next.handle(requestClone);
  //   })
  //   );
  //   }
}
