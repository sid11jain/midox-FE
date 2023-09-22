import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private commonService: CommonService, private route: ActivatedRoute) { }

  async ngOnInit() {
    await this.route.params.subscribe(async (params) => {
      const patternId = params['patternId'];
      const brandId = params['brandId'];
      console.log('Received ID:', patternId);
      this.bundleAddaData = await this.commonService.getDataFn1({ "patternId": patternId }, "bundle", "get-bundles");
      this.employeeData = await this.commonService.getDataFn1({}, "employee", "get-employees");
      this.processData = await this.commonService.getDataFn1({ "brandId": brandId }, "design", "get-designs");
      this.processData = this.processData[0].processes;
      console.log("processData ", this.processData);

      this.showSpinner = false;


    });

  }

  exportPdf(data:any): void {
    let detail = data?.data;
    
    const docDefinition: any =  {
      pageOrientation: "portrait",
      //pageMargins: [20, 10, 20, 40],
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
