import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-subcategory',
  templateUrl: './add-subcategory.component.html',
  styleUrls: ['./add-subcategory.component.scss']
})
export class AddSubcategoryComponent {

  subCategoryForm: FormGroup;
  subCategoryData: any[] = [];
  editedSubCategoryIndex: number | null = null;
  deleteBtnDisabled: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.subCategoryForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.subCategoryForm.invalid) {
      return;
    }
    this.deleteBtnDisabled = false;
    const name = this.subCategoryForm.controls['name'].value;
    
    if (this.editedSubCategoryIndex !== null) {
      this.subCategoryData[this.editedSubCategoryIndex].name = name;
      this.editedSubCategoryIndex = null;
    } else {
      const val = { name: name };
      this.subCategoryData.push(val);
    }
    this.subCategoryForm.reset();
  }

  edit(data: any, index: number) {
    this.deleteBtnDisabled = true;
    this.editedSubCategoryIndex = index;
    this.subCategoryForm.patchValue({
      name: data.name
    });
  }

  delete(index: number) {
    this.subCategoryData.splice(index, 1);
  }
}
