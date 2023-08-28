import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-add-design',
  templateUrl: './add-design.component.html',
  styleUrls: ['./add-design.component.scss']
})
export class AddDesignComponent {

  // designForm: FormGroup;
  designData: any[] = [];
  editedDesignIndex: number | null = null;  
  dropDownValue:any = ["ACTIVE","INACTIVE"];
  dialogTitle:string = "Design";

  processBtnDisabled: boolean = false;

  designReactiveForm!: FormGroup;
  // brandDropdownValues: string[] = ["Midox", 'Ciana'];
  brandDropdownValues: any = [];
  // productDropdownValues: string[] = ['T shirt', 'Shirt', 'Boxer'];
  productDropdownValues: any = [];
  formEntries: any[] = [];
  // addMsg:boolean = true; 
  
  editedMaterialIndex: number | null = null;
  showSpinner:boolean = true; 
  showSpinnerTable:boolean = true; 

  modalValue:any={};

  constructor(private formBuilder: FormBuilder, private common: CommonService, public dialog: MatDialog) {  }

  async ngOnInit() {
    this.getBrand({});
    this.getProduct();
    this.designReactiveForm = this.formBuilder.group({
      brandId: ['', Validators.required],
      productCd: ['', Validators.required],
      designNo: ['', [Validators.required, Validators.minLength(3)]],
      details: ['', [Validators.required, Validators.minLength(3)]],
      status: ['', Validators.required],
    });
    
    this.formEntries = await this.common.getDataFn1({}, "design", "get-designs");
    this.showSpinnerTable = false;
  }

  async onSubmit() {
    if (this.designReactiveForm.invalid) {
      return;
    }
    this.showSpinnerTable = true;    
    const selectControl1 = this.designReactiveForm.get('brandId');    
    const selectControl2 = this.designReactiveForm.get('productCd');
    selectControl1?.enable();
    selectControl2?.enable();

    console.log("Form: ",this.designReactiveForm.value);   

    if(this.editedMaterialIndex !== null){
      //For update
      this.showSpinnerTable = false;
    }
    else{
      //For add
      let temp = await this.common.addDataFn1(this.designReactiveForm?.value, "design", "add", "get-designs", this.dialogTitle);
      if(temp){
        this.formEntries = temp;
      }
      this.showSpinnerTable = false;
    }

    
    // this.formEntries.push(this.designReactiveForm?.value);     
    
    this.editedMaterialIndex = null;
    this.processBtnDisabled = false;
    this.designReactiveForm.reset();
  }

  onEdit(index: number) {    
    this.processBtnDisabled = true;
    this.editedMaterialIndex = index;
    let entry:any = {};
    entry = {...this.formEntries[index]};
    console.log(entry);
    entry.productCd = entry?.productCd?.entityCd;
    
    this.designReactiveForm.patchValue(entry);

    console.log(this.designReactiveForm.value);
    
    
    const selectControl1 = this.designReactiveForm.get('brandId');
    const selectControl2 = this.designReactiveForm.get('productCd');
    selectControl1?.disable();
    selectControl2?.disable();
  }

  // Modal open
  selectProcess(data:any){
    console.log(data);
    this.modalValue = data;    
  }

  //API Call
  getProduct(){    
    this.common.getAllSettingsData("MID_PROD").subscribe((responseData:any)=>{
      let response = responseData?.body;
      if (responseData.status === 200) {
        this.productDropdownValues = response;
        console.log(response);        
      }
      else{
        console.log("Error code: ",responseData?.status);        
      }
      this.showSpinner = false;
    });
  }

  getBrand(data:any){
    this.common.addSupplierOrBrandSettingsData(data,"brand","get-brands").subscribe(async (responseData:any)=>{
      let response = responseData?.body;   
      if (responseData.status === 200) {
        console.log("Brand",response);     
        this.brandDropdownValues = response;
      }
      else{
        console.log("Error code: ",responseData?.status);  
      }      
      this.showSpinner = false;  
    });
  }

}
