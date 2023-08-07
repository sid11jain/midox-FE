import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-add-measurement',
  templateUrl: './add-measurement.component.html',
  styleUrls: ['./add-measurement.component.scss']
})
export class AddMeasurementComponent {
  
  measurementTypeForm: FormGroup;
  measurementTypeData: any[] = [];
  measurementTypeArray: any[] = [];
  editedMeasurementTypeIndex: number | null = null;
  deleteBtnDisabled: boolean = false;
  showSpinner: boolean = true;

  constructor(private formBuilder: FormBuilder, private common: CommonService, public dialog: MatDialog) {
    this.measurementTypeForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(){
    this.getMeasrurementType();
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
      name: data.displayValue
    });
  }

  delete(index: number) {
    this.measurementTypeData.splice(index, 1);
  }

  //API Call
  getMeasrurementType(){    
    this.common.getAllSettingsData("MID_UNIT").subscribe((responseData:any)=>{
      let response = responseData?.body;
      if (responseData.status === 200) {
        this.measurementTypeArray = response;
        console.log(response);        
      }
      else{
        console.log("Error code: ",responseData?.status);        
      }
      this.showSpinner = false;
    });
  }
}
