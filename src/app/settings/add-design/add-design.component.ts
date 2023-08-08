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
  brandDropdownValues: string[] = ["Midox", 'Ciana'];
  productDropdownValues: string[] = ['T shirt', 'Shirt', 'Boxer'];
  formEntries: any[] = [];
  addMsg:boolean = true; 

  modalValue:any={};

  constructor(private formBuilder: FormBuilder, private common: CommonService, public dialog: MatDialog) {  }

  ngOnInit() {
    this.designReactiveForm = this.formBuilder.group({
      brandDropdown: ['', Validators.required],
      productDropdown: ['', Validators.required],
      inputField: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit() {
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
  }

  selectProcess(data:any){
    console.log(data);
    this.modalValue = data;
    
  }

}
