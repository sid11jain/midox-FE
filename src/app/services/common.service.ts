import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  // private baseUrl = environment.apiEndpoint;
  // private payloadUrl: string;
  // private payload: string;
  // loginData: any;
  // userName: any;
  dispatchData = new BehaviorSubject('');
  addMaterialData = new BehaviorSubject('');
  stockHistoryData = new BehaviorSubject('');
  employeeJobHistoryData = new BehaviorSubject('');
  constructor() { }
}
