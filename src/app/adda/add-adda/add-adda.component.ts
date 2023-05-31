import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-adda',
  templateUrl: './add-adda.component.html',
  styleUrls: ['./add-adda.component.scss']
})
export class AddAddaComponent implements OnInit {

  addAddaForm:any = FormGroup;

  brandNamesData:any=["One","Two","Three","Four","Five"]; 
  productData:any=["One","Two","Three","Four","Five"]; 
  designNumberData:any=["One","Two","Three","Four","Five"]; 
  managingInfoData:any=["One","Two","Three","Four","Five"]; 
  employeeNameData:any=["One","Two","Three","Four","Five"]; 

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.addAddaForm = this.formBuilder.group({
      quantity: ['', [Validators.required, Validators.min(1)]],
      brand: ['', Validators.required],
      designNumber: ['', Validators.required],
      product: ['', Validators.required],
      managingInfo: ['', Validators.required],
      employeeName: ['', Validators.required],
      currentFullTimestamp: [''],
    });
  }

  onSubmit() {
    if (this.addAddaForm.invalid) {
      return;
    }
    const currentFullTimestamp = new Date();
    this.addAddaForm.patchValue({ currentFullTimestamp });
    
    console.log('Dispatch Inventory Form values:', this.addAddaForm.value);
  }

 
}
