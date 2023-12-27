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
  showSpinner:boolean = false;
  addaEmployeeRolesTitle = "Add Employee Roles";
  
  toppings = new FormControl('');
  // toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  roleList:any = [
    {key:{"role":"ROLE_ACCOUNT"}, value: "Account"},
    {key:{"role":"ROLE_DISPATCH"}, value: "Dispatch"},
    {key:{"role":"ROLE_JOB"}, value: "Job"},
    {key:{"role":"ROLE_ADDA"}, value: "Adda"},
    {key:{"role":"ROLE_INVENTORY"}, value: "Inventory"},
    {key:{"role":"ROLE_ADMIN"}, value: "Admin"},
  ]
  employeeDetails:any;
  forEditEmployeeRoles:boolean = false;

  addaEmployeeRolesForm: FormGroup;

  
  // To send data from child to parent
  @Output() forDetailAddReloadMaterial = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder, private common: CommonService, public dialog: MatDialog,  private route: ActivatedRoute) {
    this.addaEmployeeRolesForm = this.formBuilder.group({
      empId: [''],
      roles: [[], Validators.required],
    });
  }

  ngOnInit(){

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

  ngOnChanges(){
    this.resetForm();
    console.log(this.employeeDataForRole);
    this.employeeDetails = this.employeeDataForRole;
    this.addaEmployeeRolesForm.patchValue({
      empId: this.employeeDataForRole?.empId,
    })    
  }

}
