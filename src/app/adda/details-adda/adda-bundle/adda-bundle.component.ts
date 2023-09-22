import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {NgFor, AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatAutocomplete } from '@angular/material/autocomplete';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-adda-bundle',
  templateUrl: './adda-bundle.component.html',
  styleUrls: ['./adda-bundle.component.scss']
})
export class AddaBundleComponent {
  showSpinner: boolean = true;
  bundleAddaData: any;
  employeeData: any = [];
  processData: any = [];
  detailAddaData:any;
  
  filteredOptionsEmployee!: Observable<any[]>;
  myControlEmployee = new FormControl('');
  optionsEmployee: any[] = ['One', 'Two', 'Three'];
  dialogTitle:string = "Employee Assign";
  statusDropDownValue:any = [
    {displayValue:"To be started", entityCd:"PROC_STAT_TBS"},
    {displayValue:"In Progress", entityCd:"PROC_STAT_INP"},
    {displayValue:"Hold", entityCd:"PROC_STAT_HOLD"},
    {displayValue:"Finished", entityCd:"PROC_STAT_FIN"},
  ];
  
  statusForm!:FormGroup;

  constructor(private formBuilder: FormBuilder, private commonService: CommonService, private route: ActivatedRoute) { }

  async ngOnInit() { 
    this.showSpinner = true;
    this.statusForm = this.formBuilder.group({
      status: ['PROC_STAT_TBS', Validators.required]
    });
    await this.route.params.subscribe(async (params) => {
      const patternId = params['patternId'];
      const brandId = params['brandId'];
      const addaId = params['addaId'];
      console.log('Received ID:', patternId);
      
      this.detailAddaData = await this.commonService.getDataFn1({"addaId":addaId}, "adda", "get-addas");
      this.bundleAddaData = await this.commonService.getDataFn1({ "patternId": patternId }, "bundle", "get-bundles");
      this.employeeData = await this.commonService.getDataFn1({}, "employee", "get-employees");
      this.processData = await this.commonService.getDataFn1({ "brandId": brandId }, "design", "get-designs");
      this.processData = this.processData[0].processes;
      console.log("processData ", this.processData);

      
      this.optionsEmployee = [...this.employeeData];
      this.filteredOptionsEmployee = this.myControlEmployee.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );

      this.showSpinner = false;
      
    // this.statusForm.get('status')?.disable(); 
    });
  }

  private _filter(value: any): any {
    console.log(value);
    let filterValue:any;
    filterValue = value.toLowerCase();
    return this.optionsEmployee.filter((val:any) => val?.empName?.toLowerCase().includes(filterValue));
  }

  async statusChangefn(val:any, data:any){
    // console.log(val.target.value);
    this.showSpinner = true;
    let tempObj = {"bundleId": data.bundleId, "currentProcessStatus":val.target.value};
    console.log(tempObj);
    
    this.statusForm.reset();
    let temp = await this.commonService.addDataFn1(tempObj, "bundle", "update-status", "get-bundles", this.dialogTitle);
    this.ngOnInit();
    
    
  }
  
  // async onSubmit() {
  //   if (this.statusForm.invalid) {
  //     return;
  //   }
  //   // this.showSpinner = true;
  //   console.log('statusForm Form values:', this.statusForm.value);

  // }

  async optionSelectedEmployee(event: any, data:any){
    const selectedOptionValue = event.option.value;
    console.log('Selected Option Value:', selectedOptionValue);
    let employeeObj = this.employeeData.find((option: any) => option.empName === selectedOptionValue);
    // console.log('Selected Option:', employeeObj);
    let currentEmployeeId = employeeObj.empId;
    // console.log("Row data ", data);
    let bundleId = data.bundleId;
    let tempObj = {"bundleId":bundleId, "currentEmployeeId":currentEmployeeId}
    // console.log("currentEmployeeId ",currentEmployeeId);
    // console.log("bundleId ",bundleId);
    console.log("tempObj ",tempObj);
    this.showSpinner = true;
    this.myControlEmployee.reset();
    let temp = await this.commonService.addDataFn1(tempObj, "bundle", "assign-employee", "get-bundles", this.dialogTitle);
    this.ngOnInit();
    

    // this.maxQuantiy = this.stockDataObj.availableQuantity;
    // this.addaMaterialForm?.get('stockId')?.patchValue(this.stockDataObj.stockId);  
    // this.addaMaterialForm?.get('addaId')?.patchValue(this.addaId);  
  }

  printStickerFn(){
    console.log("Print sticker fn clicked");
    
  }
  exportPdf(data:any): void {
    let detail = data?.data;
    
    const docDefinition: any =  {
      pageOrientation: "portrait",
      //pageMargins: [20, 10, 20, 40],
      pageSize: "A4",
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

    footer: function (currentPage:any, pageCount:any) {
      return [{ text: 'Page ' + currentPage.toString() + ' of ' + pageCount, alignment: 'center' }];
    },
      
      content: [
        { text: "JC-2713", style: "header" },
        {
            
          canvas: [
              { type: 'line', x1: 0, y1: -15, x2: 520, y2: -15, lineWidth: 2 }, //Bottom line
          ]
        },
        {
          alignment: 'justify',
          style: "row",
          columns: [
            {
              // columns: [
              //   {
              //     text: [{text:"Employee", bold:true},{text:":     "}, {text:"Pooja"}],
              //   }
              // ],
              columns: [
                {
                  text: "Employee",
                  bold: true
                },
                {
                  text: detail?.createdBy?.empName
                }
              ],
              style: "column",
            },
            {
              columns: [
                {
                  text: "Job Assigned",
                  bold: true
                },
                {
                  text: detail?.currentProcessCd?.displayValue
                }
              ]
            }
          ]
        },
        {
          alignment: 'justify',
          style: "row",
          columns: [
            {
              columns: [
                {
                  text: "Adda No.",
                  bold: true
                },
                {
                  text: detail?.currentProcessCd?.displayValue
                }
              ],
              style: "column",
            },
            {
              columns: [
                {
                  text: "Item",
                  bold: true
                },
                {
                  text: "F4"
                }
              ]
            }
          ]
        },
        {
          alignment: 'justify',
          style: "row",
          columns: [
            {
              columns: [
                {
                  text: "Product",
                  bold: true
                },
                {
                  text: detail?.bundleName
                }
              ],
              style: "column",
            },
            {
              columns: [
                {
                  text: "Size",
                  bold: true
                },
                {
                  text: detail?.bundleName
                }
              ]
            }
          ]
        },
        {
          alignment: 'justify',
          style: "row",
          columns: [
            {
              columns: [
                {
                  text: "Bundle",
                  bold: true
                },
                {
                  text: detail?.bundleName
                }
              ],
              style: "column",
            },
            {
              columns: [
                {
                  text: "Design",
                  bold: true
                },
                {
                  text: detail?.currentProcessCd?.displayValue
                }
              ]
            }
          ]
        },
        {
          alignment: 'justify',
          style: "row",
          columns: [
            {
              columns: [
                {
                  text: "Quantity",
                  bold: true
                },
                {
                  text: detail?.quantity
                }
              ],
              style: "column",
            },
            {
              columns: [
                {
                  text: "Wage to Provide",
                  bold: true
                },
                {
                  text: detail?.quantity
                }
              ]
            }
          ]
        },
        {
          alignment: 'justify',
          style: "row",
          columns: [
            {
              columns: [
                {
                  text: "Rate",
                  bold: true
                },
                {
                  text: detail?.quantity
                }
              ],
              style: "column",
            },
            {
              columns: [
                {
                  text: "Job Flow Number",
                  bold: true
                },
                {
                  text: detail?.currentProcessCd?.displayValue
                }
              ]
            }
          ]
        },
        {
          text: "Job Details",
          style: "subheader"
        },
        {
            
          canvas: [
              { type: 'line', x1: 0, y1: -15, x2: 520, y2: -15, lineWidth: 1 }, //Bottom line
          ]
        },
        {
          alignment: 'justify',
          style: "row",
          columns: [
            {
              columns: [
                {
                  text: "Product Job",
                  bold: true
                },
                {
                  text: detail?.displayValue
                }
              ],
              style: "column",
            },
            {
              columns: [

              ]
            }
          ]
        },

        {
          alignment: 'justify',
          style: "row",
          columns: [
            {
              columns: [
                {
                  text: "Status",
                  bold: true
                },
                {
                  text: detail?.status?.displayValue
                }
              ],
              style: "column",
            },
            {
              columns: [

              ]
            }
          ]
        },

        {
          alignment: 'justify',
          style: "row",
          columns: [
            {
              columns: [
                {
                  text: "Last Modified By",
                  bold: true
                },
                {
                  text: detail?.updatedBy?.empName
                }
              ],
              style: "column",
            },
            {
              columns: [

              ]
            }
          ]
        },
      ],

      styles: {
        header: {
          fontSize: 20,
          bold: true,
          margin: [0, 0, 0, 20]
        },
        subheader: {
          fontSize: 15,
          bold: true,
          margin: [0, 30, 0, 20],
          fillColor: '#cccccc'
        },
        row: {
          margin: [20,0, 0, 0],
          fontSize: 10,
        },
        column: {
          margin: [10, 0, 10, 10]
        }
      }
    };
    pdfMake.createPdf(docDefinition).open();
  }
}
