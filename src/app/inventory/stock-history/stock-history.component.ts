import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-history',
  templateUrl: './stock-history.component.html',
  styleUrls: ['./stock-history.component.scss']
})
export class StockHistoryComponent {
  showSpinner:boolean = true;

  ngOnInit(){
    setTimeout(() => {
      this.showSpinner = false
    }, 1000);
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
