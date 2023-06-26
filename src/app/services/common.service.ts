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
  // private baseUrl = environment.apiEndpoint;
  // private payloadUrl: string;
  // private payload: string;
  // loginData: any;
  // userName: any;
  dispatchData = new BehaviorSubject('');
  addMaterialData = new BehaviorSubject('');
  stockHistoryData = new BehaviorSubject('');
  employeeJobHistoryData = new BehaviorSubject('');
  employeePaymentData = new BehaviorSubject('');
  constructor() { }

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
}
