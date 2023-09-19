import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adda-add-pattern',
  templateUrl: './adda-add-pattern.component.html',
  styleUrls: ['./adda-add-pattern.component.scss']
})
export class AddaAddPatternComponent {
  showSpinner:boolean = true;

  ngOnInit(){
    setTimeout(() => {
      this.showSpinner = false;
    }, 1000);
  }
}
