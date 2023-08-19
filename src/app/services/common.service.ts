import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { saveAs } from 'file-saver-es';
import { Workbook } from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { MsgDialogComponent } from '../shared/msg-dialog/msg-dialog.component';
import { MatDialog } from '@angular/material/dialog';


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

  constructor(private http: HttpClient, public dialog: MatDialog) { }

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
    this.payloadUrl = `${this.baseUrl}stock/save`;
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

  getStockHistory(payload:any): Observable<any> {
    this.payloadUrl = `${this.baseUrl}stockHistory/get-history-with-criteria`;
    return this.http.post(this.payloadUrl, payload, this.httpOptions).pipe(
      catchError(this.handleError('getStockHistory', []))
    );
  }

  // Get
  getAllSettingsData(type:any): Observable<any> {
    this.payloadUrl = `${this.baseUrl}groups/get-entities/${type}`;
    return this.http.get(this.payloadUrl, this.httpOptions).pipe(
      catchError(this.handleError('getAllSettingsData', []))
    );
  }

  // getAllSupplierSettingsData(): Observable<any> {
  //   // this.payloadUrl = `${this.baseUrl}supplier/get-suppliers`;
  //   this.payloadUrl = "http://203.161.56.56:8080/midoxapp/supplier/get-suppliers";
  //   return this.http.get(this.payloadUrl, this.httpOptions).pipe(
  //     catchError(this.handleError('getAllSupplierSettingsData', []))
  //   );
  // }

  // Delete
  deleteAllSettingsData(type:any): Observable<any> {
    this.payloadUrl = `${this.baseUrl}groups/delete-entity/${type}`;
    return this.http.delete(this.payloadUrl, this.httpOptions).pipe(
      catchError(this.handleError('deleteAllSettingsData', []))
    );
  }

  // Add
  addAllSettingsData(data:any): Observable<any> {
    // this.payloadUrl = `${this.baseUrl}groups/save-entity/${type}`;
    this.payloadUrl = `${this.baseUrl}groups/save-entity`;
    return this.http.post(this.payloadUrl, data, this.httpOptions).pipe(
      catchError(this.handleError('addAllSettingsData', []))
    );
  }

  addSupplierOrBrandSettingsData(data:any, key1:string, key2:string): Observable<any> {
    // this.payloadUrl = `${this.baseUrl}groups/save-entity/${type}`;
    this.payloadUrl = `${this.baseUrl}${key1}/${key2}`;
    return this.http.post(this.payloadUrl, data, this.httpOptions).pipe(
      catchError(this.handleError('addAllSettingsData', []))
    );
  }

  // Edit
  editAllSettingsData(data:any): Observable<any> {
    this.payloadUrl = `${this.baseUrl}groups/edit-entity`;
    return this.http.post(this.payloadUrl, data, this.httpOptions).pipe(
      catchError(this.handleError('editAllSettingsData', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

// ==============================================================================
// For common functions
// ==============================================================================

  // For modal
  openDialog(dialogTitle:string, dialogMessage:string): void {
    const dialogRef = this.dialog.open(MsgDialogComponent, {
      width: '400px',
      data: { title: dialogTitle, message: dialogMessage }
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    });
  }

  // Get api call function for setting pages
  
  // async getDataFn1(key:string){
  //   // console.log("Get API Call");    
  //   await (await this.getAllSettingsData(key)).subscribe((responseData:any)=>{
  //     let response:any = "";
  //     if (responseData?.status === 200) {
  //       response = responseData?.body;
  //       console.log("response ",response);        
  //     }
  //     else{
  //       console.log("Error code: ",responseData?.status);        
  //     }
  //     return response;
  //     // this.showSpinner = false;
  //   });
  // }

  async getDataFn(key:string){
    console.log("Get API Call");    
    try{
      let response = await this.getAllSettingsData(key).toPromise();   
      if (response?.status === 200) {
        console.log(response.body);        
        return response?.body;      
      }
      else{
        console.log("Error code: ",response?.status);        
      }      
    }
    catch(error){
      console.log("Error ", error);      
    }
  }
  
  // Edit api call function for setting pages
  async editDataFn(data:any, dialogTitle:string, key:string){
    console.log("Edit API Call");    
    try{
      let response = await this.editAllSettingsData(data).toPromise();        
      let dialogMessage = dialogTitle; 
      if (response?.status === 200) {
        let responseData = await this.getDataFn(key);
        dialogMessage += ' update successfully.';         
        // To open modal
        this.openDialog(dialogTitle,dialogMessage);    
        return responseData;      
      }
      else{
        console.log("Error code: ",response?.status);   
        dialogMessage += ' failed to update.';             
        // To open modal
        this.openDialog(dialogTitle,dialogMessage);    
      }        
    }
    catch(error){
      console.log("Error ", error);      
    }
  }
  
  // Delete api call function for setting pages
  async deleteDataFn(entityCd:any, dialogTitle:string, key:string){
    console.log("Delete API Call");    
    try{
      let response = await this.deleteAllSettingsData(entityCd).toPromise();        
      let dialogMessage = dialogTitle; 
      if (response?.status === 200) {
        let responseData = await this.getDataFn(key);
        dialogMessage += ' delete successfully.';         
        // To open modal
        this.openDialog(dialogTitle,dialogMessage);    
        return responseData;      
      }
      else{
        console.log("Error code: ",response?.status);   
        dialogMessage += ' failed to delete.';             
        // To open modal
        this.openDialog(dialogTitle,dialogMessage);    
      }        
    }
    catch(error){
      console.log("Error ", error);      
    }
  }
  
  // Post  api call function for setting pages
  async addDataFn(data:any, dialogTitle:string, key:string){
    console.log("Post API Call");    
    try{
      let response = await this.addAllSettingsData(data).toPromise();        
      let dialogMessage = dialogTitle; 
      if (response?.status === 201) {
        let responseData = await this.getDataFn(key);
        dialogMessage += ' saved successfully.';         
        // To open modal
        this.openDialog(dialogTitle,dialogMessage);    
        return responseData;      
      }
      else{
        console.log("Error code: ",response?.status);   
        dialogMessage += ' failed to saved.';             
        // To open modal
        this.openDialog(dialogTitle,dialogMessage);    
      }        
    }
    catch(error){
      console.log("Error ", error);      
    }
  }

}
