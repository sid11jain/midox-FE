import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-adda',
  templateUrl: './add-adda.component.html',
  styleUrls: ['./add-adda.component.scss']
})
export class AddAddaComponent implements OnInit {

  // addAddaForm:any = FormGroup;

  //To get data from parent for edit
  @Input() forEditAdda:any = '';

  // To send data from child to parent
  @Output() forViewAddReload = new EventEmitter<any>();

  addaId:any = 0;
  addaNo:any;
  addAddaForm!:FormGroup;
  showSpinner:boolean = true;
  addaTitle:string = "Add ADDA";
  // statusDropDownValue:any = ["ACTIVE","INACTIVE"];
  statusDropDownValue:any = [
    {displayValue:"To be started", entityCd:"PROC_STAT_TBS"},
    {displayValue:"In Progress", entityCd:"PROC_STAT_INP"},
    {displayValue:"Hold", entityCd:"PROC_STAT_HOLD"},
    {displayValue:"Finished", entityCd:"PROC_STAT_FIN"},
  ];
  dialogTitle:string = "ADDA"
  brandNamesData:any=[]; 
  employeeData:any=[]; 
  designNumberData:any=[]; 

  constructor(private formBuilder: FormBuilder, private common: CommonService) { 
    this.initForm();
  }

  ngOnChanges(){  
    this.addAddaForm.reset();
    this.initForm();
    // this.ngOnInit();
    this.getBrand({});    
    this.addAddaForm.get('status')?.disable(); 
    this.addAddaForm.get('designId')?.disable(); 

    if(this.forEditAdda){
      this.addaTitle = "Edit ADDA";
      this.addAddaForm.get('status')?.enable();
      this.addaId = this.forEditAdda?.addaId;
      this.addaNo = this.forEditAdda?.addaNo;
      // this.addAddaForm.patchValue(this.forEditAdda);
      this.addAddaForm.patchValue({
        brandId: this.forEditAdda.brandDetails.brandId,
        designId: this.forEditAdda.designNo,
        quantity: this.forEditAdda.quantity,
        remarks: this.forEditAdda.remarks,
        completionDate: this.forEditAdda.completionDate,
        status: this.forEditAdda.status.entityCd,
        dryingBy: this.forEditAdda?.addaInfo?.dryingBy?.empId,
        cuttingBy: this.forEditAdda?.addaInfo?.cuttingBy?.empId,
        tieBy: this.forEditAdda?.addaInfo?.tieBy?.empId,
        custom: this.forEditAdda?.addaInfo?.custom?.empId,
        grossWeight: this.forEditAdda?.addaInfo?.grossWeight,
        netWeight: this.forEditAdda?.addaInfo?.netWeight,
        wastageWeight: this.forEditAdda?.addaInfo?.wastageWeight,
        wastagePercent: this.forEditAdda?.addaInfo?.wastagePercent,
        ribWeight: this.forEditAdda?.addaInfo?.ribWeight,
        paipinWeight: this.forEditAdda?.addaInfo?.paipinWeight,
        ribNetWeight: this.forEditAdda?.addaInfo?.ribNetWeight,
      });
      console.log(this.employeeData);
      
    }
    else{
      this.addaTitle = "Add ADDA";
    }
  }

  initForm(): void {
    this.addAddaForm = this.formBuilder.group({
      brandId: ['', Validators.required],
      designId: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      remarks: ['', [Validators.required, Validators.minLength(3)]],
      completionDate: ['', Validators.required],
      status: ['PROC_STAT_TBS', Validators.required],
      dryingBy: [''],
      cuttingBy: [''],
      tieBy: [''],
      custom: [''],
      grossWeight: [''],
      netWeight: [''],
      wastageWeight: [''],
      wastagePercent: [''],
      ribWeight: [''],
      paipinWeight: [''],
      ribNetWeight: [''],      
    });
  }

  async ngOnInit() {    
    this.addAddaForm.get('status')?.disable(); 
    this.addAddaForm.get('designId')?.disable(); 
    this.getBrand({});    
    this.employeeData = await this.common.getDataFn1({}, "employee", "get-employees");
  }
  
  async getDesignFn(data:any){
    //Once I pass design id then it will send design values
    this.addAddaForm.get('designId')?.disable();
    this.designNumberData = [];
    this.designNumberData = await this.common.getDataFn1({"brandId": data.value}, "design", "get-designs");       
    this.addAddaForm.get('designId')?.enable(); 
  }

  getBrand(data:any){
    this.common.addSupplierOrBrandSettingsData(data,"brand","get-brands").subscribe(async (responseData:any)=>{
      let response = responseData?.body;   
      if (responseData.status === 200) {
        this.brandNamesData = response;
      }
      else{
        console.log("Error code: ",responseData?.status);  
      }      
      this.showSpinner = false;  
    });
  }

  async onSubmit() {
    if (this.addAddaForm.invalid) {
      return;
    }
    this.showSpinner = true;

    let finalObject:any = this.transformObject(this.addAddaForm?.value);
    if(this.forEditAdda){
      finalObject.addaId = this.addaId;
      finalObject.addaNo = this.addaNo;
      let temp = await this.common.addDataFn1(finalObject, "adda", "edit", "get-addas", this.dialogTitle);
    }
    else{
      let temp = await this.common.addDataFn1(finalObject, "adda", "add", "get-addas", this.dialogTitle);
    }
    
    this.showSpinner = false;
    this.addAddaForm.reset();
    document.getElementById("addAddaModalBtn")?.click();
    this.forViewAddReload.emit(true);
  }

  transformObject(originalObject: any): any {
    return {
      brandId: originalObject.brandId,
      designId: originalObject.designId,
      quantity: originalObject.quantity,
      remarks: originalObject.remarks,
      completionDate: originalObject.completionDate,
      status: originalObject.status,
      addaInfo: {
        dryingBy: originalObject.dryingBy,
        cuttingBy: originalObject.cuttingBy,
        tieBy: originalObject.tieBy,
        custom: originalObject.custom,
        grossWeight: originalObject.grossWeight,
        netWeight: originalObject.netWeight,
        wastageWeight: originalObject.wastageWeight,
        wastagePercent: originalObject.wastagePercent,
        ribWeight: originalObject.ribWeight,
        paipinWeight: originalObject.paipinWeight,
        ribNetWeight: originalObject.ribNetWeight,
      },
    };
  }

 
}
