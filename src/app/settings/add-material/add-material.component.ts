import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.scss']
})
export class AddMaterialComponent {
  materialForm: FormGroup;
  materials: any[] = [];
  editedMaterialIndex: number | null = null;
  deleteBtnDisabled: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.materialForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.materialForm.invalid) {
      return;
    }
    this.deleteBtnDisabled = false;
    const name = this.materialForm.controls['name'].value;
    
    if (this.editedMaterialIndex !== null) {
      this.materials[this.editedMaterialIndex].name = name;
      this.editedMaterialIndex = null;
    } else {
      const newMaterial = { name: name };
      this.materials.push(newMaterial);
    }
    this.materialForm.reset();
  }

  editMaterial(material: any, index: number) {
    this.deleteBtnDisabled = true;
    this.editedMaterialIndex = index;
    this.materialForm.patchValue({
      name: material.name
    });
  }

  deleteMaterial(index: number) {
    this.materials.splice(index, 1);
  }  
}
