import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adda-add-material',
  templateUrl: './adda-add-material.component.html',
  styleUrls: ['./adda-add-material.component.scss']
})
export class AddaAddMaterialComponent {
  showSpinner:boolean = true;

  ngOnInit(){
    setTimeout(() => {
      this.showSpinner = false;
    }, 1000);
  }

}
