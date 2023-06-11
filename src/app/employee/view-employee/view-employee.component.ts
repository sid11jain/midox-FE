import { Component } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent {
  showSpinner:boolean = true;
  
  constructor(private commonService: CommonService){  }

  ngOnInit(){
    setTimeout(() => {
      this.showSpinner = false 
    }, 1000);
  }

  sendViewEmployeedata(data:any){
    this.commonService.addMaterialData.next(data);    
  }

  getSelectedData(rowData:any) {
    console.log("rowData ", rowData);   
    this.sendViewEmployeedata(rowData);
  }

  viewEmployeeData: any = [
    {
      unique_id: "165",
      employeeName: "Bilal",
      jobPending: 25,
      paid: 5000,
      paymentDue: 2000,
      addMaterial: "Add/View",
    },
    {
      unique_id: "166",
      employeeName: "Mahendr",
      jobPending: 35,
      paid: 15000,
      paymentDue: 12000,
      addMaterial: "Add/View",
    },
    {
      unique_id: "166",
      employeeName: "Mahendr",
      jobPending: 35,
      paid: 15000,
      paymentDue: 12000,
      addMaterial: "Add/View",
    },
    {
      unique_id: "166",
      employeeName: "Mahendr",
      jobPending: 35,
      paid: 15000,
      paymentDue: 12000,
      addMaterial: "Add/View",
    },
    {
      unique_id: "166",
      employeeName: "Mahendr",
      jobPending: 35,
      paid: 15000,
      paymentDue: 12000,
      addMaterial: "Add/View",
    },
    {
      unique_id: "166",
      employeeName: "Mahendr",
      jobPending: 35,
      paid: 15000,
      paymentDue: 12000,
      addMaterial: "Add/View",
    },
    {
      unique_id: "165",
      employeeName: "Bilal",
      jobPending: 25,
      paid: 5000,
      paymentDue: 2000,
      addMaterial: "Add/View",
    },
    {
      unique_id: "165",
      employeeName: "Bilal",
      jobPending: 25,
      paid: 5000,
      paymentDue: 2000,
      addMaterial: "Add/View",
    },
    {
      unique_id: "165",
      employeeName: "Bilal",
      jobPending: 25,
      paid: 5000,
      paymentDue: 2000,
      addMaterial: "Add/View",
    },
    {
      unique_id: "165",
      employeeName: "Bilal",
      jobPending: 25,
      paid: 5000,
      paymentDue: 2000,
      addMaterial: "Add/View",
    },
    {
      unique_id: "165",
      employeeName: "Bilal",
      jobPending: 25,
      paid: 5000,
      paymentDue: 2000,
      addMaterial: "Add/View",
    },
    {
      unique_id: "165",
      employeeName: "Bilal",
      jobPending: 25,
      paid: 5000,
      paymentDue: 2000,
      addMaterial: "Add/View",
    },
    {
      unique_id: "165",
      employeeName: "Bilal",
      jobPending: 25,
      paid: 5000,
      paymentDue: 2000,
      addMaterial: "Add/View",
    },
  ]
} 
