import { Component, OnChanges, OnInit, Input } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-pay-employee',
  templateUrl: './pay-employee.component.html',
  styleUrls: ['./pay-employee.component.scss']
})
export class PayEmployeeComponent {

  @Input() employeeDataForPayment:any;
  paymentModeOptions:any;
  allEmployeeList:any;
  selectedEmployeeObj:any;
  payEmployeeTitle:string = "Pay Employee";
  showSpinner:boolean = true;
  filteredOptions!: Observable<any[]>;
  myControl = new FormControl('');
  
  payEmployeeForm!: FormGroup;
  options: any[] = ['One', 'Two', 'Three'];

  // To send data from child to parent
  @Output() forOutstandingPageReload = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder, private common: CommonService){}

  async ngOnInit(){  
    
    this.showSpinner = true;      
    this.paymentModeOptions = await this.common.getDataFn("MID_PAY");
    this.allEmployeeList = await this.common.getDataFn1({}, "employee", "get-employees");
    
    this.payEmployeeForm = this.formBuilder.group({
      // addaId: [this.addaId],
      paymentMode: ['', Validators.required],
      paidBy: ['', Validators.required],
      paymentDate: [''],
      amountPaid: ['', [Validators.required, Validators.min(1)]],
      details: ['', [Validators.required, Validators.minLength(3)]],
      // quantity: ['', [Validators.required, Validators.min(1)]],
      // bundleSize: ['', [Validators.required, Validators.min(1)]],
    });

    this.options = [...this.allEmployeeList];
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.showSpinner = false;
  }

  private _filter(value: any): any {
    // console.log(value);
    let filterValue:any;
    filterValue = value.toLowerCase();
    return this.options.filter((val:any) => val?.empName?.toLowerCase().includes(filterValue));
  }

  optionSelected(event: any): void {
    const selectedOptionValue = event.option.value;
    // console.log('Selected Option Value:', selectedOptionValue);
    this.selectedEmployeeObj = this.allEmployeeList.find((option: any) => option?.empName === selectedOptionValue);
    console.log('Selected Option:', this.selectedEmployeeObj);
    let empIdPaidBy = this.selectedEmployeeObj?.empId;
    // this.maxQuantiy = this.stockDataObj.availableQuantity;
    // this.maxQuantityunit = this.stockDataObj.unit.displayValue;
    // this.addaMaterialForm?.get('stockId')?.patchValue(this.stockDataObj.stockId);  
    this.payEmployeeForm?.get('paidBy')?.patchValue(empIdPaidBy);  
  }

  async onSubmit() {
    if (this.payEmployeeForm.invalid) {
      return;
    }  
    // console.log(this.payEmployeeForm.value);    
    this.showSpinner = true; 
    let payEmpObj = {...this.payEmployeeForm.value};
    payEmpObj.employeeId = this.employeeDataForPayment?.employeeId?.empId;
    console.log("payEmpObj ",payEmpObj);    
    // let temp1 = await this.common.getDataFn1(payEmpObj, "employee", "pay");
      let temp = await this.common.addDataFn1(payEmpObj, "employee", "pay", "get-employees", this.payEmployeeTitle);
    
    // if(this.forEditAddaPattern){
    //   let tempObj = {...this.patternAddaAddForm.value};
    //   tempObj.patternId = this.patternId;
    //   tempObj.patternName = this.patternName;
    //   console.log("Edit ",tempObj);    
    //   let temp = await this.common.addDataFn1(tempObj, "adda", "update-pattern", "get-addas", this.addaPatternTitle);
    // }
    // else{
    //   this.patternAddaAddForm.controls['addaId'].patchValue(this.addaId);
    //   console.log("Add ",this.patternAddaAddForm.value);
    //   let temp = await this.common.addDataFn1(this.patternAddaAddForm?.value, "adda", "add-pattern", "get-addas", this.addaPatternTitle);
    // }    
    this.resetForm();
    this.showSpinner = false;
    this.forOutstandingPageReload.emit(true);
    // this.ngOnInit();
    document.getElementById("addAddaPatternBtn")?.click();    
  }

  resetForm(){
    this.payEmployeeForm?.reset();
    this.myControl?.reset();
  }

  ngOnChanges(){
    if(this.employeeDataForPayment){
      console.log("employeeDataForPayment ", this.employeeDataForPayment);
      this.resetForm();
    }    
  }

}
