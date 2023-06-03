import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-colorfabric',
  templateUrl: './add-colorfabric.component.html',
  styleUrls: ['./add-colorfabric.component.scss']
})
export class AddColorfabricComponent {

  colorFabricForm: FormGroup;
  colorFabricData: any[] = [];
  editedColorFabricIndex: number | null = null;
  deleteBtnDisabled: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.colorFabricForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.colorFabricForm.invalid) {
      return;
    }
    this.deleteBtnDisabled = false;
    const name = this.colorFabricForm.controls['name'].value;
    
    if (this.editedColorFabricIndex !== null) {
      this.colorFabricData[this.editedColorFabricIndex].name = name;
      this.editedColorFabricIndex = null;
    } else {
      const val = { name: name };
      this.colorFabricData.push(val);
    }
    this.colorFabricForm.reset();
  }

  edit(data: any, index: number) {
    this.deleteBtnDisabled = true;
    this.editedColorFabricIndex = index;
    this.colorFabricForm.patchValue({
      name: data.name
    });
  }

  delete(index: number) {
    this.colorFabricData.splice(index, 1);
  }
}
