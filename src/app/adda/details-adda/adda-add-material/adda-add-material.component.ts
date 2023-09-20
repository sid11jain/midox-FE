import { Component, OnInit } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {NgFor, AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonService } from 'src/app/services/common.service';
import { ViewChild } from '@angular/core';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adda-add-material',
  templateUrl: './adda-add-material.component.html',
  styleUrls: ['./adda-add-material.component.scss']
})
export class AddaAddMaterialComponent {
  showSpinner:boolean = true;
  myControl = new FormControl('');
  options: any[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<any[]>;
  stockDataObj:any;
  stockDataFull:any;
  maxQuantiy:any;
  addaId:any;
  
  addaMaterialForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private common: CommonService, public dialog: MatDialog,  private route: ActivatedRoute) {
    this.addaMaterialForm = this.formBuilder.group({
      addaId: ['', Validators.required],
      stockId: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
    });
  }

  
  async onSubmit() {
    if (this.addaMaterialForm.invalid) {
      return;
    }   
    console.log(this.addaMaterialForm.value);
    this.addaMaterialForm.reset();
    this.myControl.reset();
    this.maxQuantiy = -1;

    
  }

  async ngOnInit(){
    
    await this.route.params.subscribe(async (params) => {
      this.addaId = params['addaId'];
    })
    
    this.stockDataFull = await this.common.getDataFn1({}, "stock", "get-stocks");
    this.options = [...this.stockDataFull];
    
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
      );
      this.showSpinner = false;
  }

  private _filter(value: any): any {
    console.log("v ",value);
    let filterValue:any;
    // if(value.stockName){
    //   filterValue = value.stockName.toLowerCase();
    // }
    // else{
    //   filterValue = value.toLowerCase();
    // }
    filterValue = value.toLowerCase();

    return this.options.filter((val:any) => val?.stockName?.toLowerCase().includes(filterValue));
  }
  optionSelected(event: any): void {
    const selectedOptionValue = event.option.value;
    console.log('Selected Option Value:', selectedOptionValue);
    this.stockDataObj = this.stockDataFull.find((option: any) => option.stockName === selectedOptionValue);
    console.log('Selected Option:', this.stockDataObj);
    this.maxQuantiy = this.stockDataObj.availableQuantity;
    this.addaMaterialForm?.get('stockId')?.patchValue(this.stockDataObj.stockId);  
    this.addaMaterialForm?.get('addaId')?.patchValue(this.addaId);  
  }

}
