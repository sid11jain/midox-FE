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
  showDropdown: boolean = true;
  dropDownValue:any = [];

  constructor(private formBuilder: FormBuilder) {
    this.colorFabricForm = this.formBuilder.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
    });
  }
  
  ngOnInit(){
    this.dropDownValue = ["Red", "Green", "Brown", "Blue"];
  }

  onCheckboxChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if(target.checked){
      this.showDropdown = false;
    }
    else{
      this.showDropdown = true;
    }
  }

  onSubmit() {
    if (this.colorFabricForm.invalid) {
      return;
    }
    this.deleteBtnDisabled = false;
    const name = this.colorFabricForm.controls['name'].value;
    const code = this.colorFabricForm.controls['code'].value;
    
    if (this.editedColorFabricIndex !== null) {
      this.colorFabricData[this.editedColorFabricIndex].name = name;
      this.colorFabricData[this.editedColorFabricIndex].code = code;
      this.editedColorFabricIndex = null;
    } else {
      const val = { name: name, code:code };
      this.colorFabricData.push(val);
    }
    this.colorFabricForm.reset();
  }

  edit(data: any, index: number) {
    this.deleteBtnDisabled = true;
    this.editedColorFabricIndex = index;
    this.colorFabricForm.patchValue({
      name: data.name,
      code: data.code
    });
  }

  delete(index: number) {
    this.colorFabricData.splice(index, 1);
  }
}
