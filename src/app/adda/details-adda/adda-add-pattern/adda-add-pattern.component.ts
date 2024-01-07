import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common.service';
import { ActivatedRoute } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-adda-add-pattern',
  templateUrl: './adda-add-pattern.component.html',
  styleUrls: ['./adda-add-pattern.component.scss']
})
export class AddaAddPatternComponent {
  showSpinner:boolean = true;  
  patternAddaAddForm!: FormGroup;
  colorArray: any[] = [];
  sizeArray: any[] = [];
  bundleDropdownData: any[] = [];
  key: string = "MID_COL";
  key1: string = "MID_SIZE";
  addaId:any;
  dialogTitle:string = "Adda Pattern";
  addaPatternTitle:string = "Add Adda Pattern";
  patternId:string = "";
  patternName:string = "";
  bundleAmount:number = 0;

  // To send data from child to parent
  @Output() forDetailAddReloadPattern = new EventEmitter<any>();
  
  //To get data from parent for edit
  @Input() forEditAddaPattern:any = '';
  detailAddaData:any;
  remainingQtyAdda:any;
  showBundleAmount:boolean= false;
  
  constructor(private formBuilder: FormBuilder, private common: CommonService, public dialog: MatDialog,  private route: ActivatedRoute) {  }

  async ngOnInit(){
    
    await this.route.params.subscribe(async (params) => {
      this.addaId = params['addaId'];
    })   

    this.patternAddaAddForm = this.formBuilder.group({
      // addaId: [this.addaId],
      addaId: [''],
      size: ['', Validators.required],
      color: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      bundleSize: ['', [Validators.required, Validators.min(1)]],
    });
    this.patternAddaAddForm.get('bundleSize')?.disable();
    
    this.colorArray = await this.common.getDataFn(this.key);
    this.sizeArray = await this.common.getDataFn(this.key1);
    
    this.showSpinner = false; 
    this.patternAddaAddForm?.get('quantity')?.valueChanges.subscribe(value => {
      this.patternAddaAddForm.get('bundleSize')?.reset();
      this.patternAddaAddForm.get('bundleSize')?.disable();
      
      this.showBundleAmount = false;
    });
  }

  getBundleData(){
    let bundleValue = this.patternAddaAddForm.get('bundleSize')?.value;
    if(bundleValue){
      const quantityValue = this.patternAddaAddForm.get('quantity')?.value;
      this.bundleAmount = quantityValue / bundleValue;
      this.showBundleAmount = true;
    }
  }

  onBlur(): void {
    const inputValue = this.patternAddaAddForm.get('quantity')?.value;
    if(inputValue){
      this.bundleDropdownData = this.findFactors(inputValue);
      this.patternAddaAddForm.get('bundleSize')?.enable();
    }
    
    // Perform any other operations you want with the value
  }

  async onSubmit() {
    if (confirm("Are you sure to save Adda pattern information?")) {
      if (this.patternAddaAddForm.invalid) {
        return;
      }
      this.showSpinner = true;
      if (this.forEditAddaPattern) {
        let tempObj = { ...this.patternAddaAddForm.value };
        tempObj.patternId = this.patternId;
        tempObj.patternName = this.patternName;
        let temp = await this.common.addDataFn1(tempObj, "adda", "update-pattern", "get-addas", this.addaPatternTitle);
      }
      else {
        this.patternAddaAddForm.controls['addaId'].patchValue(this.addaId);
        let temp = await this.common.addDataFn1(this.patternAddaAddForm?.value, "adda", "add-pattern", "get-addas", this.addaPatternTitle);
      }

      await this.updateRemainingQtyFn();
      this.resetForm();
      this.showSpinner = false;
      this.forDetailAddReloadPattern.emit(true);
      document.getElementById("addAddaPatternBtn")?.click();
    }
  }

  async updateRemainingQtyFn(){
    this.detailAddaData = await this.common.getDataFn1({"addaId":this.addaId}, "adda", "get-addas");
    this.remainingQtyAdda = this.detailAddaData[0]?.remainingQtyForPattern;  
  }

  async ngOnChanges(){
    await this.updateRemainingQtyFn();
    this.resetForm();
    // this.initForm();
    // this.ngOnInit();

    if(this.forEditAddaPattern){
      this.addaPatternTitle = "Edit Adda Pattern";
      this.patternId = this.forEditAddaPattern.patternId; 
      this.patternName = this.forEditAddaPattern.patternName; 
      // this.addaMaterialForm.get('stockId')?.disable();
      this.patternAddaAddForm.patchValue({
        addaId: this.addaId,
        size: this.forEditAddaPattern.size.entityCd,
        color: this.forEditAddaPattern.color.entityCd,
        quantity: this.forEditAddaPattern.quantity,
        bundleSize: this.forEditAddaPattern.bundleSize,
      });
    }
    else{
      this.addaPatternTitle = "Add Adda Pattern";
    }
  }

  resetForm(){
    this.patternAddaAddForm?.reset();
  }

  findFactors(inputNumber:number) {
    const factors = [];
    for (let i = 1; i <= inputNumber; i++) {
      if (inputNumber % i === 0) {
        factors.push(i);
      }
    }
    return factors;
  }
  
}
