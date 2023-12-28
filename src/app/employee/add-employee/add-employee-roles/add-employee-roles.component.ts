import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field'
import { CommonService } from 'src/app/services/common.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-employee-roles',
  templateUrl: './add-employee-roles.component.html',
  styleUrls: ['./add-employee-roles.component.scss']
})
export class AddEmployeeRolesComponent implements OnInit {

  @Input() employeeDataForRole:any = "";
  @Input() timeInMiliSeconds:any = "";
  showSpinner:boolean = true;
  addaEmployeeRolesTitle = "Add Employee Roles";
  
  toppings = new FormControl('');
  // toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  // roleList:any = [
  //   {key: "ROLE_ACCOUNT", value: "Account"},
  //   {key: "ROLE_DISPATCH", value: "Dispatch"},
  //   {key: "ROLE_JOB", value: "Job"},
  //   {key: "ROLE_ADDA", value: "Adda"},
  //   {key: "ROLE_INVENTORY", value: "Inventory"},
  //   {key: "ROLE_ADMIN", value: "Admin"},
  // ];
  employeeDetails:any;
  roleList:any;
  forEditEmployeeRoles:boolean = false;

  addaEmployeeRolesForm: FormGroup;
  
  // To send data from child to parent
  @Output() forDetailAddReloadMaterial = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder, private common: CommonService, public dialog: MatDialog,  private route: ActivatedRoute) {
    this.addaEmployeeRolesForm = this.formBuilder.group({
      employeeId: [''],
      roles: [[], Validators.required],
    });
  }

  async ngOnInit(){
    this.showSpinner = true;
    this.roleList = await this.common.getDataFn("MID_ROLE");    
    this.showSpinner = false;
  }

  async onSubmit() {
    if (this.addaEmployeeRolesForm.invalid) {
      return;
    }  
    this.showSpinner = true; 
    console.log(this.addaEmployeeRolesForm.value);
    
    if(this.forEditEmployeeRoles){
      
      let tempObj = {...this.addaEmployeeRolesForm.value};
      console.log("edit", tempObj);
      // tempObj.addaMaterialId = this.addaMaterialId;
      // let temp = await this.common.addDataFn1(tempObj, "adda", "update-material", "get-addas", this.addaMaterialTitle);
      }
    else{
      let temp = await this.common.addDataFn1(this.addaEmployeeRolesForm?.value, "employee", "add-roles", "get-employees", this.addaEmployeeRolesTitle);
    }    
    this.resetForm();
    this.showSpinner = false;
    this.forDetailAddReloadMaterial.emit(true);
    // this.ngOnInit();
    document.getElementById("addAddaMaterialBtn")?.click();    
  }
  
  resetForm(){   
    this.addaEmployeeRolesForm.reset();
  }

  async ngOnChanges(){
    this.showSpinner = true;
    this.resetForm();
    console.log(this.employeeDataForRole);
    this.employeeDetails = this.employeeDataForRole;
    this.addaEmployeeRolesForm.patchValue({
      employeeId: this.employeeDataForRole?.empId,
    })   
    
    if(this.employeeDetails?.empId){
      let empRolesData = await this.common.getBundleSearchFn("employee/get-roles", this.employeeDetails?.empId)
      console.log("employeeData ",empRolesData); 
      if(empRolesData.length > 0){
        this.addaEmployeeRolesForm.patchValue({
          roles: empRolesData,
        })
      }
    }
    this.showSpinner = false;
  }

}
