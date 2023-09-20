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
  showSpinner:boolean = true;
  bundleAddaData:any;  
  employeeData:any = [];
  processData:any = [];

  constructor(private commonService: CommonService, private route: ActivatedRoute){  }

  async ngOnInit(){    
    await this.route.params.subscribe(async (params) => { 
      const patternId = params['patternId'];
      const brandId = params['brandId'];
      console.log('Received ID:', patternId);
      this.bundleAddaData = await this.commonService.getDataFn1({"patternId":patternId}, "bundle", "get-bundles");
      this.employeeData = await this.commonService.getDataFn1({}, "employee", "get-employees");
      this.processData = await this.commonService.getDataFn1({"brandId":brandId}, "design", "get-designs");
      this.processData = this.processData[0].processes;
      console.log("processData ", this.processData);
      
      this.showSpinner = false;      
      
          
    });
    
  }

  exportPdf(): void {

    const docDefinition:any = {
    
      content: [
        { text: "Tables", style: "header" },
        "Official documentation is in progress, this document is just a glimpse of what is possible with pdfmake and its layout engine.",
        {
          text:
            "A simple table (no headers, no width specified, no spans, no styling)",
          style: "subheader"
        },
        "The following table has nothing more than a body array",
        {
          style: "tableExample",
          table: {
            body: [
              ["Column 1", "Column 2", "Column 3"],
              ["One value goes here", "Another one here", "OK?"]
            ]
          }
        }
      ],

      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        }
      }
    };

    pdfMake.createPdf(docDefinition).open();
  }
}
