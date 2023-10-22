import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-dispatch', 
  templateUrl: './dispatch.component.html',
  styleUrls: ['./dispatch.component.scss']
})
export class DispatchComponent implements OnInit {

  dispatchInventoryForm:any = FormGroup;
  
  // To send data from child to parent
  @Output() forFinishGoodPageReload = new EventEmitter<any>();   
  @Input() dataForDispatch:any;
  
  showSpinner:boolean = false; 
  dispatchLimit:any;
  dispatchTitle:string = "Dispatch"

  constructor(private formBuilder: FormBuilder, private common: CommonService) { }

  ngOnChanges(){
    if(this.dataForDispatch){
      console.log("dataForDispatch ", this.dataForDispatch);
      this.dispatchLimit = this.dataForDispatch?.availableQuantity;
      this.resetForm();
    }    
  }

  ngOnInit() {
    this.dispatchInventoryForm = this.formBuilder.group({
      quantity: ['', [Validators.required, Validators.min(1)]],
      remarks: ['', [Validators.required, Validators.minLength(3)]],
      vehicleNo: ['', [Validators.required, Validators.minLength(3)]],
      dispatchNo: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  async onSubmit() {
    if (this.dispatchInventoryForm.invalid) {
      return;
    }
    // const currentFullTimestamp = new Date();
    // this.dispatchInventoryForm.patchValue({ currentFullTimestamp });
    // console.log('Dispatch Inventory Form values:', this.dispatchInventoryForm.value);
    this.showSpinner = true; 
    let finalObj = {...this.dispatchInventoryForm.value};
    finalObj.finishedGoodsId = this.dataForDispatch?.finishedGoodsId;
    console.log("final dispatch: ",finalObj);
    let temp = await this.common.addDataFn1(finalObj, "finished-goods", "dispatch", "get-dispatches", this.dispatchTitle);    
    this.resetForm();
    this.showSpinner = false; 
    this.forFinishGoodPageReload.emit(true);
    document.getElementById("addAddaPatternBtn")?.click();    
  }

  resetForm(){
    this.dispatchInventoryForm.reset();
  }

}
