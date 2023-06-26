import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-measurement',
  templateUrl: './add-measurement.component.html',
  styleUrls: ['./add-measurement.component.scss']
})
export class AddMeasurementComponent {
  
  measurementTypeForm: FormGroup;
  measurementTypeData: any[] = [];
  editedMeasurementTypeIndex: number | null = null;
  deleteBtnDisabled: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.measurementTypeForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.measurementTypeForm.invalid) {
      return;
    }
    this.deleteBtnDisabled = false;
    const name = this.measurementTypeForm.controls['name'].value;
    
    if (this.editedMeasurementTypeIndex !== null) {
      this.measurementTypeData[this.editedMeasurementTypeIndex].name = name;
      this.editedMeasurementTypeIndex = null;
    } else {
      const val = { name: name };
      this.measurementTypeData.push(val);
    }
    this.measurementTypeForm.reset();
  }

  edit(data: any, index: number) {
    this.deleteBtnDisabled = true;
    this.editedMeasurementTypeIndex = index;
    this.measurementTypeForm.patchValue({
      name: data.name
    });
  }

  delete(index: number) {
    this.measurementTypeData.splice(index, 1);
  }
}
