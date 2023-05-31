import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  employeeForm:any = FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
      employeeName: ['', [Validators.required, Validators.minLength(3)]],
      dobEmployee: ['', Validators.required],
      // employeeAdhaar: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
      employeeAdhaar: ['', [Validators.required, Validators.pattern(/^[0-9]{12}$/)]],
      // employeeMobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      employeeMobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      currentFullTimestamp: [''],
      gender: ['', Validators.required],
      employeeAddress: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.employeeForm.invalid) {
      return;
    }
    const currentFullTimestamp = new Date();
    this.employeeForm.patchValue({ currentFullTimestamp });
    
    console.log('Emp Form values:', this.employeeForm.value);
  }
 
}
