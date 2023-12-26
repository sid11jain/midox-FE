import { Component, Input, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-add-employee-roles',
  templateUrl: './add-employee-roles.component.html',
  styleUrls: ['./add-employee-roles.component.scss']
})
export class AddEmployeeRolesComponent implements OnInit {

  @Input() employeeDataForRole:any = "";

  ngOnInit(){

  }

  ngOnChanges(){
    console.log(this.employeeDataForRole);
    

  }

}
