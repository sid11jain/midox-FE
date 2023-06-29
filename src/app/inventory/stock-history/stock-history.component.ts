import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-stock-history',
  templateUrl: './stock-history.component.html',
  styleUrls: ['./stock-history.component.scss']
})
export class StockHistoryComponent {
  showSpinner:boolean = true;
  stockHistoryForm:any = FormGroup; 
  dateSelectorGroup!:FormGroup;
  displayStartDate:string = "N/A";
  displayEndDate:string = "N/A";
  
  stockHistoryDetails: any = [];
  constructor(private formBuilder: FormBuilder, private commonService: CommonService){ 
    commonService.stockHistoryData.subscribe((val:any) => {
      this.stockHistoryDetails = val;
      console.log(this.stockHistoryDetails);
      
    });
  }

  // constructor(private formBuilder: FormBuilder) { }

  ngOnInit(){    
    this.stockHistoryForm = this.formBuilder.group({
      uniqueId: ['', Validators.required],      
      currentFullTimestamp: ['']
    })  
    this.initializeForm();  
  }

  initializeForm(){
    this.dateSelectorGroup = this.formBuilder.group({
      startDate:['', Validators.required],
      endDate:['', Validators.required]
    });
 
    this.dateSelectorGroup.controls['startDate'].valueChanges.subscribe(value => {
      console.log('start date changes');
      if(value){
        this.displayStartDate = value;
        // const endDate = moment(this.dateSelectorGroup.controls['endDate'].value);
        // const startDate = moment(value);
        // const difference = endDate.diff(startDate, 'days');
        // console.log(difference);
        // if(difference > 90){
        //   this.displayEndDate = value;
        // }
      }
      else{
        this.displayStartDate = "N/A"
      }
    });
 
    this.dateSelectorGroup.controls['endDate'].valueChanges.subscribe(value => {
      console.log('end date changes');
      
      if(value){
        const endDate = moment(value);
        const startDate = moment(this.dateSelectorGroup.controls['startDate'].value);
        const difference = endDate.diff(startDate, 'days');
        console.log(difference);
        if(difference < 90){
          this.displayEndDate = value;
        }else{
          setTimeout(()=>{
            this.dateSelectorGroup.reset();
          }, 200)
          
        }
        
      }
      else{
        this.displayEndDate = "N/A"
      }
    })
  }

  onSubmit() { 
    if (this.dateSelectorGroup.invalid) {
      return;
    }
    console.log('Form values:', this.dateSelectorGroup.value);
    this.dateSelectorGroup.reset();

    setTimeout(() => {
      this.showSpinner = false
    }, 100);
  }

  viewClothData: any = [
    {
      unique_id:"123",
      bill_number:"12345",
      date:"12-May-2023",
      packing_slip_number:"987",
      supplier_name:"Midox",
      material:"wool",
      color_fabric_code:"37",
      cloth:"Win2_37_Ciana",
      sub_category:"PC hosiery sinkar fabric",
      measuring_unit:"KG",
      avl_qty: 439,
      amount:100,
      is_cloth:true
    },
    {
      unique_id:"124",
      bill_number:"12345",
      date:"12-May-2023",
      packing_slip_number:"987",
      supplier_name:"Midox",
      material:"wool",
      color_fabric_code:"37",
      cloth:"Blue_45_Jyoti",
      sub_category:"CO hosiery Matty fabric",
      measuring_unit:"Meter",
      avl_qty: 225,
      amount:100,
      is_cloth:true
    },
    {
      unique_id:"125",
      bill_number:"12345",
      date:"12-May-2023",
      packing_slip_number:"987",
      supplier_name:"Midox",
      material:"wool",
      color_fabric_code:"37",
      cloth:"White_78_Jyoti",
      sub_category:"Cotton hosiery sinkar fabric",
      measuring_unit:"KG",
      avl_qty: 876,
      amount:100,
      is_cloth:true
    },
    {
      unique_id:"125",
      bill_number:"12345",
      date:"12-May-2023",
      packing_slip_number:"987",
      supplier_name:"Midox",
      material:"wool",
      color_fabric_code:"37",
      cloth:"White_78_Jyoti",
      sub_category:"Cotton hosiery sinkar fabric",
      measuring_unit:"KG",
      avl_qty: 876,
      amount:100,
      is_cloth:true
    },
    {
      unique_id:"125",
      bill_number:"12345",
      date:"12-May-2023",
      packing_slip_number:"987",
      supplier_name:"Midox",
      material:"wool",
      color_fabric_code:"37",
      cloth:"White_78_Jyoti",
      sub_category:"Cotton hosiery sinkar fabric",
      measuring_unit:"KG",
      avl_qty: 876,
      amount:100,
      is_cloth:true
    },
    {
      unique_id:"125",
      bill_number:"12345",
      date:"12-May-2023",
      packing_slip_number:"987",
      supplier_name:"Midox",
      material:"wool",
      color_fabric_code:"37",
      cloth:"White_78_Jyoti",
      sub_category:"Cotton hosiery sinkar fabric",
      measuring_unit:"KG",
      avl_qty: 876,
      amount:100,
      is_cloth:true
    },
    {
      unique_id:"125",
      bill_number:"12345",
      date:"12-May-2023",
      packing_slip_number:"987",
      supplier_name:"Midox",
      material:"wool",
      color_fabric_code:"37",
      cloth:"White_78_Jyoti",
      sub_category:"Cotton hosiery sinkar fabric",
      measuring_unit:"KG",
      avl_qty: 876,
      amount:100,
      is_cloth:true
    },
    {
      unique_id:"125",
      bill_number:"12345",
      date:"12-May-2023",
      packing_slip_number:"987",
      supplier_name:"Midox",
      material:"wool",
      color_fabric_code:"37",
      cloth:"White_78_Jyoti",
      sub_category:"Cotton hosiery sinkar fabric",
      measuring_unit:"KG",
      avl_qty: 876,
      amount:100,
      is_cloth:true
    },
    {
      unique_id:"125",
      bill_number:"12345",
      date:"12-May-2023",
      packing_slip_number:"987",
      supplier_name:"Midox",
      material:"wool",
      color_fabric_code:"37",
      cloth:"White_78_Jyoti",
      sub_category:"Cotton hosiery sinkar fabric",
      measuring_unit:"KG",
      avl_qty: 876,
      amount:100,
      is_cloth:true
    },
    {
      unique_id:"125",
      bill_number:"12345",
      date:"12-May-2023",
      packing_slip_number:"987",
      supplier_name:"Midox",
      material:"wool",
      color_fabric_code:"37",
      cloth:"White_78_Jyoti",
      sub_category:"Cotton hosiery sinkar fabric",
      measuring_unit:"KG",
      avl_qty: 876,
      amount:100,
      is_cloth:true
    },
    {
      unique_id:"125",
      bill_number:"12345",
      date:"12-May-2023",
      packing_slip_number:"987",
      supplier_name:"Midox",
      material:"wool",
      color_fabric_code:"37",
      cloth:"White_78_Jyoti",
      sub_category:"Cotton hosiery sinkar fabric",
      measuring_unit:"KG",
      avl_qty: 876,
      amount:100,
      is_cloth:true
    },
    {
      unique_id:"125",
      bill_number:"12345",
      date:"12-May-2023",
      packing_slip_number:"987",
      supplier_name:"Midox",
      material:"wool",
      color_fabric_code:"37",
      cloth:"White_78_Jyoti",
      sub_category:"Cotton hosiery sinkar fabric",
      measuring_unit:"KG",
      avl_qty: 876,
      amount:100,
      is_cloth:true
    },
    {
      unique_id:"125",
      bill_number:"12345",
      date:"12-May-2023",
      packing_slip_number:"987",
      supplier_name:"Midox",
      material:"wool",
      color_fabric_code:"37",
      cloth:"White_78_Jyoti",
      sub_category:"Cotton hosiery sinkar fabric",
      measuring_unit:"KG",
      avl_qty: 876,
      amount:100,
      is_cloth:true
    },
    {
      unique_id:"125",
      bill_number:"12345",
      date:"12-May-2023",
      packing_slip_number:"987",
      supplier_name:"Midox",
      material:"wool",
      color_fabric_code:"37",
      cloth:"White_78_Jyoti",
      sub_category:"Cotton hosiery sinkar fabric",
      measuring_unit:"KG",
      avl_qty: 876,
      amount:100,
      is_cloth:true
    },
    {
      unique_id:"125",
      bill_number:"12345",
      date:"12-May-2023",
      packing_slip_number:"987",
      supplier_name:"Midox",
      material:"wool",
      color_fabric_code:"37",
      cloth:"White_78_Jyoti",
      sub_category:"Cotton hosiery sinkar fabric",
      measuring_unit:"KG",
      avl_qty: 876,
      amount:100,
      is_cloth:true
    },
    {
      unique_id:"125",
      bill_number:"12345",
      date:"12-May-2023",
      packing_slip_number:"987",
      supplier_name:"Midox",
      material:"wool",
      color_fabric_code:"37",
      cloth:"White_78_Jyoti",
      sub_category:"Cotton hosiery sinkar fabric",
      measuring_unit:"KG",
      avl_qty: 876,
      amount:100,
      is_cloth:true
    },
    {
      unique_id:"125",
      bill_number:"12345",
      date:"12-May-2023",
      packing_slip_number:"987",
      supplier_name:"Midox",
      material:"wool",
      color_fabric_code:"37",
      cloth:"White_78_Jyoti",
      sub_category:"Cotton hosiery sinkar fabric",
      measuring_unit:"KG",
      avl_qty: 876,
      amount:100,
      is_cloth:true
    },
    {
      unique_id:"125",
      bill_number:"12345",
      date:"12-May-2023",
      packing_slip_number:"987",
      supplier_name:"Midox",
      material:"wool",
      color_fabric_code:"37",
      cloth:"White_78_Jyoti",
      sub_category:"Cotton hosiery sinkar fabric",
      measuring_unit:"KG",
      avl_qty: 876,
      amount:100,
      is_cloth:true
    },
    {
      unique_id:"125",
      bill_number:"12345",
      date:"12-May-2023",
      packing_slip_number:"987",
      supplier_name:"Midox",
      material:"wool",
      color_fabric_code:"37",
      cloth:"White_78_Jyoti",
      sub_category:"Cotton hosiery sinkar fabric",
      measuring_unit:"KG",
      avl_qty: 876,
      amount:100,
      is_cloth:true
    },
    {
      unique_id:"125",
      bill_number:"12345",
      date:"12-May-2023",
      packing_slip_number:"987",
      supplier_name:"Midox",
      material:"wool",
      color_fabric_code:"37",
      cloth:"White_78_Jyoti",
      sub_category:"Cotton hosiery sinkar fabric",
      measuring_unit:"KG",
      avl_qty: 876,
      amount:100,
      is_cloth:true
    },
];




}
