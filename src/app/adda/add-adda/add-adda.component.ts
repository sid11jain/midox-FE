import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-add-adda',
  templateUrl: './add-adda.component.html',
  styleUrls: ['./add-adda.component.scss']
})
export class AddAddaComponent implements OnInit {

  // addAddaForm:any = FormGroup;
  addAddaForm!:FormGroup;
  showSpinner:boolean = true;
  // statusDropDownValue:any = ["ACTIVE","INACTIVE"];
  statusDropDownValue:any = [
    {displayValue:"To be started", entityCd:"PROC_STAT_TBS"},
    {displayValue:"In Progress", entityCd:"PROC_STAT_INP"},
    {displayValue:"Hold", entityCd:"PROC_STAT_HOLD"},
    {displayValue:"Finished", entityCd:"PROC_STAT_FIN"},
  ];
  dialogTitle:string = "ADDA"
  brandNamesData:any=[]; 
  designNumberData:any=[]; 
  // productData:any=["One","Two","Three","Four","Five"]; 
  // managingInfoData:any=["One","Two","Three","Four","Five"]; 
  // employeeNameData:any=["One","Two","Three","Four","Five"]; 

  constructor(private formBuilder: FormBuilder, private common: CommonService) { 
    this.initForm();
  }

  initForm(): void {
    this.addAddaForm = this.formBuilder.group({
      addaNo: ['', [Validators.required, Validators.minLength(3)]],
      brandId: ['', Validators.required],
      designId: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      remarks: ['', [Validators.required, Validators.minLength(3)]],
      completionDate: ['', Validators.required],
      status: ['PROC_STAT_TBS', Validators.required]
    });
  }

  async ngOnInit() {    
    this.addAddaForm.get('status')?.disable(); 
    this.addAddaForm.get('designId')?.disable(); 
    this.getBrand({});
  }
  
  async getDesignFn(data:any){
    //Once I pass design id then it will send design values
    this.addAddaForm.get('designId')?.disable(); 
    console.log("Fn brandId ",data.value);
    this.designNumberData = [];
    this.designNumberData = await this.common.getDataFn1({"brandId": data.value}, "design", "get-designs");       
    this.addAddaForm.get('designId')?.enable(); 
  }

  getBrand(data:any){
    this.common.addSupplierOrBrandSettingsData(data,"brand","get-brands").subscribe(async (responseData:any)=>{
      let response = responseData?.body;   
      if (responseData.status === 200) {
        console.log(response);     
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
    console.log('Dispatch Inventory Form values:', this.addAddaForm.value);
  //   let temp1:any = {
  //     addaNo:"Adda third Taes1t133",
  //     brandId:"5",
  //     designId:"1",
  //     quantity:"1000",
  //     remarks:"remark third adda ",
  //     completionDate: "2023-10-25",
  //     status:"PROC_STAT_TBS"
  //     // status:null
  
  // }
    let temp = await this.common.addDataFn1(this.addAddaForm?.value, "adda", "add", "get-addas", this.dialogTitle);
    // let temp = await this.common.addDataFn1(temp1, "adda", "add", "get-addas", this.dialogTitle);
    // console.log(temp);
    
    
    this.addAddaForm.reset();
  }

 
}
