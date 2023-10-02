import { Component, Input, OnChanges } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgFor, AsyncPipe } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import * as moment from 'moment';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocomplete } from '@angular/material/autocomplete';


@Component({
  selector: 'app-bundle-detail-table',
  templateUrl: './bundle-detail-table.component.html',
  styleUrls: ['./bundle-detail-table.component.scss']
})
export class BundleDetailTableComponent {
  
  bundleAddaData!: any[];
  employeeData: any = [];
  patternId:any;
  
  
  filteredOptionsEmployee!: Observable<any[]>;
  myControlEmployee = new FormControl('');
  optionsEmployee: any[] = ['One', 'Two', 'Three'];
  dialogTitle: string = "Employee Assign";
  statusDropDownValue: any = [
    { displayValue: "To be started", entityCd: "PROC_STAT_TBS" },
    { displayValue: "In Progress", entityCd: "PROC_STAT_INP" },
    { displayValue: "Hold", entityCd: "PROC_STAT_HOLD" },
    { displayValue: "Finished", entityCd: "PROC_STAT_FIN" },
  ];

  showSpinner:boolean = true;
  statusForm!: FormGroup;
  @Input() bundleDataFromParent:any = {};
  @Input() cssValue: any = "48vh";

  constructor(private formBuilder: FormBuilder, private commonService: CommonService) { }


  async ngOnInit(){
    this.showSpinner = true;
    this.statusForm = this.formBuilder.group({
      status: ['PROC_STAT_TBS', Validators.required]
    });
    // let bundleDataObj = { "patternId": 19 };
    this.bundleAddaData = await this.commonService.getDataFn1(this.bundleDataFromParent, "bundle", "get-bundles");
    this.employeeData = await this.commonService.getDataFn1({}, "employee", "get-employees");
    this.patternId = this.bundleAddaData[0]?.patternId;
    
    this.optionsEmployee = [...this.employeeData];
    this.filteredOptionsEmployee = this.myControlEmployee.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.showSpinner = false;

  }

  ngOnChanges(){    
    this.ngOnInit();
  }
  
  async statusChangefn(val: any, data: any) {
    // console.log(val.target.value);
    this.showSpinner = true;
    let tempObj = { "bundleId": data.bundleId, "currentProcessStatus": val.target.value };
    console.log(tempObj);

    this.statusForm.reset();
    let temp = await this.commonService.addDataFn1(tempObj, "bundle", "update-status", "get-bundles", this.dialogTitle);
    this.ngOnInit();
  }
  
  private _filter(value: any): any {
    // console.log(value);
    let filterValue: any;
    filterValue = value.toLowerCase();
    return this.optionsEmployee.filter((val: any) => val?.empName?.toLowerCase().includes(filterValue));
  }

  async optionSelectedEmployee(event: any, data: any) {
    const selectedOptionValue = event.option.value;
    console.log('Selected Option Value:', selectedOptionValue);
    let employeeObj = this.employeeData.find((option: any) => option.empName === selectedOptionValue);
    // console.log('Selected Option:', employeeObj);
    let currentEmployeeId = employeeObj.empId;
    // console.log("Row data ", data);
    let bundleId = data.bundleId;
    let tempObj = { "bundleId": bundleId, "currentEmployeeId": currentEmployeeId }
    // console.log("currentEmployeeId ",currentEmployeeId);
    // console.log("bundleId ",bundleId);
    console.log("tempObj ", tempObj);
    this.showSpinner = true;
    this.myControlEmployee.reset();
    let temp = await this.commonService.addDataFn1(tempObj, "bundle", "assign-employee", "get-bundles", this.dialogTitle);
    this.ngOnInit();


    // this.maxQuantiy = this.stockDataObj.availableQuantity;
    // this.addaMaterialForm?.get('stockId')?.patchValue(this.stockDataObj.stockId);  
    // this.addaMaterialForm?.get('addaId')?.patchValue(this.addaId);  
  }
  
  async printStickerFn() {
    // console.log("All Bundle : ", this.bundleAddaData);
    this.showSpinner = true;
    
    let stickerObj:any = {"patternId": this.patternId };
    if(this.bundleDataFromParent?.addaId){
      stickerObj = {"addaId": this.bundleDataFromParent.addaId };
    }
    let stickerCardPdfData = await this.commonService.getDataFn1(stickerObj, "bundle", "card");
    let fontSize = 6;
    let size = 8;
    let fontSizeRow1 = size;
    let fontSizeRow2 = size;
    let fontSizeRow3 = size;
    let contentArr:any = [];
    // this.bundleAddaData.forEach((data:any, index:number) => {
    stickerCardPdfData.forEach((data:any, index:number) => {
      console.log(data);
      
      let firstRow = {
        columns: [
          { text: [{ text: "DATE", bold: true, fontSize: fontSizeRow1 }, { text: " : ", bold: true, fontSize: fontSizeRow1 }, { text: moment(data?.date).format('DD/MM/YYYY'), bold: true, fontSize: fontSizeRow1 }],},
          { text: [{ text: "ADDA NO.", bold: true, fontSize: fontSizeRow1 }, { text: " : ", bold: true, fontSize: fontSizeRow1 }, { text: data?.addaNo, bold: true, fontSize: fontSizeRow1 }],},
          // { text: [{ text: "SR NO.", bold: true, fontSize: fontSizeRow1 }, { text: " : ", bold: true, fontSize: fontSizeRow1 }, { text: index+1, bold: true, fontSize: fontSizeRow1 }],margin:[10,0,0,0]},
          // { text: [{ text: "", bold: true, fontSize: fontSizeRow1 }, { text: "  ", bold: true, fontSize: fontSizeRow1 }, { text: "", bold: true, fontSize: fontSizeRow1 }],margin:[10,0,0,0]},
        ],
        style: "row"
      };

      let secondRow = {
        columns: [
          { text: [{ text: "BUNDLE", bold: true, fontSize: fontSizeRow2 }, { text: " : ", bold: true, fontSize: fontSizeRow2 }, { text: data?.bundle, bold: true, fontSize: fontSizeRow2 }],},
          { text: [{ text: "PRODUCT", bold: true, fontSize: fontSizeRow2 }, { text: " : ", bold: true, fontSize: fontSizeRow2 }, { text: data?.item?.displayValue, bold: true, fontSize: fontSizeRow2 }]},
          { text: [{ text: "QTY", bold: true, fontSize: fontSizeRow2 }, { text: " : ", bold: true, fontSize: fontSizeRow2 }, { text: data?.quantity, bold: true, fontSize: fontSizeRow2 }],margin:[10,0,0,0]},
        ],
        style: "row"
      };

      let thirdRow = {
        columns: [
          { text: [{ text: "COLOR", bold: true, fontSize: fontSizeRow3 }, { text: " : ", bold: true, fontSize: fontSizeRow3 }, { text: data?.color?.displayValue, bold: true, fontSize: fontSizeRow3 }],},
          { text: [{ text: "DESIGN NO.", bold: true, fontSize: fontSizeRow3 }, { text: " : ", bold: true, fontSize: fontSizeRow3 }, { text: data?.design, bold: true, fontSize: fontSizeRow3 }],},
          { text: [{ text: "SIZE", bold: true, fontSize: fontSizeRow3 }, { text: " : ", bold: true, fontSize: fontSizeRow3 }, { text: data?.size?.displayValue, bold: true, fontSize: fontSizeRow3 }],margin:[10,0,0,0]},
        ],
        style: "row"
      };

      let fourthRow = { text: [{ text: "ST. PROS.", bold: true, fontSize: fontSize }], style: "row"};

      let fifthRow = {
        style: 'table',
        table: {
          //headerRows: 1,
          body: [
            [{ text: data?.stPros[0], style: 'tableHeader', bold: true, fontSize: fontSize }, { text: data?.stPros[1], style: 'tableHeader', bold: true, fontSize: fontSize }, { text: data?.stPros[2], style: 'tableHeader', bold: true, fontSize: fontSize }, { text: data?.stPros[3], style: 'tableHeader', bold: true, fontSize: fontSize }],
            [{ text: data?.stPros[4], style: 'tableHeader', bold: true, fontSize: fontSize }, { text: data?.stPros[5], style: 'tableHeader', bold: true, fontSize: fontSize }, { text: data?.stPros[6], style: 'tableHeader', bold: true, fontSize: fontSize }, { text: data?.stPros[7], style: 'tableHeader', bold: true, fontSize: fontSize }],
            [{ text: data?.stPros[8], style: 'tableHeader', bold: true, fontSize: fontSize }, { text: data?.stPros[9], style: 'tableHeader', bold: true, fontSize: fontSize }, { text: data?.stPros[10], style: 'tableHeader', bold: true, fontSize: fontSize }, { text: data?.stPros[11], style: 'tableHeader', bold: true, fontSize: fontSize }],
            [{ text: data?.stPros[12], style: 'tableHeader', bold: true, fontSize: fontSize }, { text: data?.stPros[13], style: 'tableHeader', bold: true, fontSize: fontSize }, { text: data?.stPros[14], style: 'tableHeader', bold: true, fontSize: fontSize }, { text: data?.stPros[15], style: 'tableHeader', bold: true, fontSize: fontSize }],
          ]
        },
        layout: 'noBorders'
      };

      let pageBreak = {text: '', pageBreak: 'after'};

      contentArr.push(firstRow);
      contentArr.push(secondRow);
      contentArr.push(thirdRow);
      contentArr.push(fourthRow);
      contentArr.push(fifthRow);
      this.bundleAddaData.length - 1 != index ? contentArr.push(pageBreak) : "";

    });
    const docDefinition: any = {
      //pageOrientation: "portrait",
      pageMargins: [10, 12, 10, 12],
      pageSize: {
        width: 340,
        height: 170
      },
      content: contentArr,
      
      styles: {
        row: { margin: [2, 2, 0, 8], fontSize: 8.5},
        table: { margin: [0, 0, 0, 5], bold: true },
        // tableHeader: { margin: [60, 0, 30, 8]},
        tableHeader: { margin: [30, 0, 30, 4]},
      }
    };
    pdfMake.createPdf(docDefinition).open();
    this.showSpinner = false;
  }

  async exportPdf(detail: any){
    
    this.showSpinner = true;
    console.log("Row  detail ", detail);

    // let jobCardPdfData = await this.commonService.getDataFn1({ "exclude_status": detail.status.entityCd, "bundleHistoryId": detail.bundleId }, "job", "card");
    // let jobCardPdfData = await this.commonService.getDataFn1({"bundleHistoryId": detail.bundleId }, "job", "card");
    let jobCardPdfData = await this.commonService.getDataFn1({"bundleId": detail.bundleId }, "job", "card");
    // console.log("jobCardPdfData ",jobCardPdfData);

    // console.log("PDF detail ", this.detailAddaData);
    // console.log("processData ", this.processData);
    const docDefinition: any = {
      pageOrientation: "portrait",
      pageMargins: [40, 30, 20, 20],
      pageSize: "A6",
      //   header: {
      //     margin: 25.5,
      //     columns: [
      //         {
      //             image: logo,
      //             height: 106.4,
      //             width: 540
      //             // alignment: 'center'
      //         }
      //     ]
      // },

      footer: function (currentPage: any, pageCount: any) {
        return [{ text: 'Page ' + currentPage.toString() + ' of ' + pageCount, alignment: 'center', fontSize: 9 }];
      },

      content: [
        { text: jobCardPdfData[0]?.jobCardNo, style: "header" },
        {

          canvas: [
            { type: 'line', x1: 0, y1: -7, x2: 220, y2: -7, lineWidth: 1 }, //Bottom line
          ]
        },
        {
          style: "row",
          text: [{ text: "Employee", bold: true }, { text: " :   " }, { text: jobCardPdfData[0]?.employee?.empName }],

        },
        {
          style: "row",
          text: [{ text: "Job Assigned", bold: true }, { text: " :   " }, { text: jobCardPdfData[0]?.jobAssigned?.displayValue }],

        },
        {
          style: "row",
          text: [{ text: "Adda No.", bold: true }, { text: " :   " }, { text: jobCardPdfData[0]?.addaNo }],

        },
        {
          style: "row",
          text: [{ text: "Item", bold: true }, { text: " :   " }, { text: jobCardPdfData[0]?.item?.displayValue }],

        },
        // {
        //   style: "row",
        //   text: [{ text: "Product", bold: true }, { text: " :   " }, { text: "No details" }],

        // },
        {
          style: "row",
          text: [{ text: "Size", bold: true }, { text: " :   " }, { text: jobCardPdfData[0]?.size?.displayValue }],

        },
        {
          style: "row",
          text: [{ text: "Bundle", bold: true }, { text: " :   " }, { text: jobCardPdfData[0]?.bundle }],

        },
        {
          style: "row",
          text: [{ text: "Design", bold: true }, { text: " :   " }, { text: jobCardPdfData[0]?.design }],

        },
        {
          style: "row",
          text: [{ text: "Quantity", bold: true }, { text: " :   " }, { text: jobCardPdfData[0]?.quantity }],

        },
        {
          style: "row",
          text: [{ text: "Wage to Provide", bold: true }, { text: " :   " }, { text: jobCardPdfData[0]?.wageToProvide }],

        },
        {
          style: "row",
          text: [{ text: "Rate", bold: true }, { text: " :   " }, { text: jobCardPdfData[0]?.rate }],

        },
        {
          style: "row",
          text: [{ text: "Job Flow Number", bold: true }, { text: " :   " }, { text: jobCardPdfData[0]?.jobFlowNumber }],

        },
        // {
        //   style: "row",
        //   text: [{ text: "Total", bold: true }, { text: " :   " }, { text: jobCardPdfData[0]?.rate * jobCardPdfData[0]?.quantity }], //rate *  qty

        // },
        {
          text: "Job Details",
          style: "subheader"
        },
        {

          canvas: [
            { type: 'line', x1: 0, y1: -7, x2: 220, y2: -7, lineWidth: 1 }, //Bottom line
          ]
        },
        {
          style: "row",
          text: [{ text: "Assign Date", bold: true }, { text: " :   " }, { text: moment(jobCardPdfData[0]?.assignDate).format('DD/MM/YYYY') }],

        },
        {
          style: "row",
          text: [{ text: "Status", bold: true }, { text: " :   " }, { text: jobCardPdfData[0]?.status?.displayValue }],

        },
        {
          style: "row",
          // text: [{ text: "Last Modified By", bold: true }, { text: " :   " }, { text: `${jobCardPdfData[0]?.lastModifiedBy?.empName} ${jobCardPdfData[0]?.lastModifiedAt}`}],
          text: [{ text: "Last Modified By", bold: true }, { text: " :   " }, { text: `${jobCardPdfData[0]?.lastModifiedBy?.empName}, ${moment(jobCardPdfData[0]?.lastModifiedAt).format('DD/MM/YYYY')}`}],

        }
      ],

      styles: {
        header: {
          fontSize: 13,
          bold: true,
          margin: [0, 0, 0, 8]
        },
        subheader: {
          fontSize: 13,
          bold: true,
          margin: [0, 15, 0, 8],
          fillColor: '#cccccc'
        },
        row: {
          margin: [2, 6, 0, 0],
          fontSize: 9
        }
      }
    };
    pdfMake.createPdf(docDefinition).open();
    
    this.showSpinner = false;
  }

}
