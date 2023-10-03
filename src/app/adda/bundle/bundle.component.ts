import { Component, OnInit } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common.service';
// import { MsgDialogComponent } from 'src/app/shared/msg-dialog/msg-dialog.component';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
// import { NgFor, AsyncPipe } from '@angular/common';
// import { MatAutocompleteModule } from '@angular/material/autocomplete';
// import { MatInputModule } from '@angular/material/input';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatAutocomplete } from '@angular/material/autocomplete';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bundle',
  templateUrl: './bundle.component.html',
  styleUrls: ['./bundle.component.scss']
})
export class BundleComponent {
  bundleDetailObj:any = {};
  showSpinner: boolean = true;
  showTable: boolean = false;
  detailAddaData: any;
  
  filteredOptionsAdda!: Observable<any[]>;
  myControlAdda = new FormControl('');
  optionsAdda: any[] = ['One', 'Two', 'Three'];
  
  constructor(private commonService: CommonService) { }

  async ngOnInit(){
    this.showSpinner = true;    
    this.detailAddaData = await this.commonService.getDataFn1({}, "adda", "get-addas");
    this.optionsAdda = [...this.detailAddaData];
    this.filteredOptionsAdda = this.myControlAdda.valueChanges.pipe(
      startWith(''),
      map(value => this._filterAdda(value || '')),
    );
    this.showSpinner = false;
  }

  private _filterAdda(value: any): any {
    // console.log(value);
    let filterValue: any;
    filterValue = value.toLowerCase();
    return this.optionsAdda.filter((val: any) => val?.addaNo?.toLowerCase().includes(filterValue));
  }
  
  async optionSelectedAdda(event: any) {
    this.showTable = false;
    let selectedOptionValue = event.option.value;
    
    let addaObj = this.detailAddaData.find((option: any) => option.addaNo === selectedOptionValue);
    let addaId = addaObj.addaId;
    console.log('addaId:', addaId);
    
    this.bundleDetailObj = { "addaId": addaId };
    
    this.showTable = true;
    this.showSpinner = false;
  }

}
