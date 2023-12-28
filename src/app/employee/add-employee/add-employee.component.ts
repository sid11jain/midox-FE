import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  employeeForm:any = FormGroup;
  genderValue:any = ["MALE","FEMALE", "OTHER"];
  statusValue:any = ["EMP_ACTIVE","EMP_INACTIVE"];
  designationValue:any = ["WORKER","SUPERVISOR","MANAGER","ADMIN"];  
  employeeId:any = "";
  employeeData:any = [];
  showSpinner:boolean = true;
  dialogTitle:string = "Employee";
  editedMaterialIndex: number | null = null;
  employeeDataForRole:any="";
  timeInMiliSeconds:any;

  isAdmin!:boolean;
  isIM!:boolean;
  isADM!:boolean;
  isJM!:boolean;
  isDM!:boolean;
  isAM!:boolean;

  constructor(private formBuilder: FormBuilder, private common: CommonService, public dialog: MatDialog) { }

  async ngOnInit() {
    this.isAdmin = JSON.parse(sessionStorage.getItem("isAdmin") as any);
    this.isIM = JSON.parse(sessionStorage.getItem("isIM") as any);
    this.isADM = JSON.parse(sessionStorage.getItem("isADM") as any);
    this.isJM = JSON.parse(sessionStorage.getItem("isJM") as any);
    this.isDM = JSON.parse(sessionStorage.getItem("isDM") as any);
    this.isAM = JSON.parse(sessionStorage.getItem("isAM") as any);
    
    this.employeeForm = this.formBuilder.group({
      empName: ['', [Validators.required, Validators.minLength(3)]],
      joiningDate: ['', Validators.required],
      empDOB: ['', Validators.required],
      gender: ['', Validators.required],
      contactNo: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: ['', Validators.required],
      status: ['', Validators.required],
      identificationNo: ['', [Validators.required, Validators.pattern(/^[0-9]{12}$/)]],
      designation: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      description: ['', Validators.required],
    });

    // API call to get all employees
    this.employeeData = await this.common.getDataFn1({}, "employee", "get-employees");
    this.showSpinner = false;
  }

  async onSubmit() {
    if (this.employeeForm.invalid) {
      return;
    }
    this.showSpinner = true;
    if(this.editedMaterialIndex !== null){
      //For update
      let tempObj = this.employeeForm?.value;
      tempObj.empId = this.employeeId;
      
      let temp = await this.common.addDataFn1(this.employeeForm?.value, "employee", "edit", "get-employees", this.dialogTitle);
      if(temp){
        this.employeeData = temp;
      }
      this.showSpinner = false;
    }
    else{
      //For add
      let temp = await this.common.addDataFn1(this.employeeForm?.value, "employee", "save", "get-employees", this.dialogTitle);
      if(temp){
        this.employeeData = temp;
      }
      this.showSpinner = false;
    }
    this.editedMaterialIndex = null;
    this.employeeForm.reset(); 
    
    document.getElementById("addEmployeeAccordian")?.click();  
  }

  edit(data: any, index:number): void {    
    // this.deleteBtnDisabled = true;
    
    document.getElementById("addEmployeeAccordian")?.click();
    this.editedMaterialIndex = index;
    this.employeeId = data?.empId;
    
    
    this.employeeForm.patchValue({
      empName: data.empName,
      joiningDate: data.joiningDate,
      empDOB: data.empDOB,
      gender: data.gender,
      contactNo: data.contactNo,
      address: data.address,
      status: data.status,
      identificationNo: data.identificationNo,
      designation: data.designation,
      email: data.email,
      description: data.description
    });
  }

  roleSelection(data: any, index:number){
    this.employeeDataForRole = data;
    this.timeInMiliSeconds = new Date().getTime();
  }

  dataFromAddaMaterial(data: any) {
    this.showSpinner = true;
    this.ngOnInit();    
  }
}
