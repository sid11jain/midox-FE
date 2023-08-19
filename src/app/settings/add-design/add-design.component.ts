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
  deleteBtnDisabled: boolean = false;

  designReactiveForm!: FormGroup;
  // brandDropdownValues: string[] = ["Midox", 'Ciana'];
  brandDropdownValues: any = [];
  // productDropdownValues: string[] = ['T shirt', 'Shirt', 'Boxer'];
  productDropdownValues: any = [];
  formEntries: any[] = [];
  addMsg:boolean = true; 
  showSpinner:boolean = true; 

  modalValue:any={};

  constructor(private formBuilder: FormBuilder, private common: CommonService, public dialog: MatDialog) {  }

  ngOnInit() {
    this.getBrand({});
    this.getProduct();
    this.designReactiveForm = this.formBuilder.group({
      brandDropdown: ['', Validators.required],
      productDropdown: ['', Validators.required],
      inputField: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit() {

    
    const selectControl1 = this.designReactiveForm.get('brandDropdown');
    const selectControl2 = this.designReactiveForm.get('productDropdown');
    selectControl1?.enable();
    selectControl2?.enable();


    if (this.designReactiveForm.valid) {
      this.addMsg = true;
      this.deleteBtnDisabled = false;
      const formEntry = {
        brandDropdown: this.designReactiveForm.value.brandDropdown,
        productDropdown: this.designReactiveForm.value.productDropdown,
        inputField: this.designReactiveForm.value.inputField,
      };
      this.formEntries.push(formEntry);
      console.log("Form: ",formEntry);      
      this.designReactiveForm.reset();
    }
  }
  
  onDelete(index: number) {
    this.formEntries.splice(index, 1);
  }

  onEdit(index: number) {
    this.addMsg = false;
    this.deleteBtnDisabled = true;
    const entry = this.formEntries[index];
    this.designReactiveForm.patchValue(entry);
    this.onDelete(index); // Remove the entry from the list

    
    const selectControl1 = this.designReactiveForm.get('brandDropdown');
    const selectControl2 = this.designReactiveForm.get('productDropdown');
    selectControl1?.disable();
    selectControl2?.disable();
  }

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
