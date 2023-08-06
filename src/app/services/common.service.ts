import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { saveAs } from 'file-saver-es';
import { Workbook } from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private baseUrl = environment.apiEndpoint;
  private payloadUrl!: string;
  // loginData: any;
  // userName: any;
  dispatchData = new BehaviorSubject('');
  addMaterialData = new BehaviorSubject('');
  stockHistoryData = new BehaviorSubject('');
  employeeJobHistoryData = new BehaviorSubject('');
  employeePaymentData = new BehaviorSubject('');

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
    observe: 'response' as 'body'
  };

  constructor(private http: HttpClient) { }

  onExportingData(e:any, fileName:string) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Employees');
    let excelReportName = fileName;
    exportDataGrid({
      component: e.component,
      worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer:any) => { 
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), excelReportName+'.xlsx');
      });
    });
    e.cancel = true;
  }


  addStocks(payload:any): Observable<any> {
    this.payloadUrl = `${this.baseUrl}stock/list`;
    return this.http.post(this.payloadUrl, payload,  this.httpOptions).pipe(
      catchError(this.handleError('addStocks', []))
    );
  }

  getAllStocks(): Observable<any> {
    this.payloadUrl = `${this.baseUrl}stock/list`;
    return this.http.get(this.payloadUrl, this.httpOptions).pipe(
      catchError(this.handleError('getAllStocks', []))
    );
  }

  getStockById(stockId:any): Observable<any> {
    this.payloadUrl = `${this.baseUrl}stockHistory/get/${stockId}`;
    return this.http.get(this.payloadUrl, this.httpOptions).pipe(
      catchError(this.handleError('getStockById', []))
    );
  }

  getAllSettingsData(type:any): Observable<any> {
    this.payloadUrl = `${this.baseUrl}groups/get-entities/${type}`;
    return this.http.get(this.payloadUrl, this.httpOptions).pipe(
      catchError(this.handleError('getAllSettingsData', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
