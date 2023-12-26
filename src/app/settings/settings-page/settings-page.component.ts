import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {
  isAdmin!:boolean;
  isIM!:boolean;
  isADM!:boolean;
  isJM!:boolean;
  isDM!:boolean;
  isAM!:boolean;
  constructor(){

  }

  ngOnInit(): void {
    this.isAdmin = JSON.parse(localStorage.getItem("isAdmin") as any);
    this.isIM = JSON.parse(localStorage.getItem("isIM") as any);
    this.isADM = JSON.parse(localStorage.getItem("isADM") as any);
    this.isJM = JSON.parse(localStorage.getItem("isJM") as any);
    this.isDM = JSON.parse(localStorage.getItem("isDM") as any);
    this.isAM = JSON.parse(localStorage.getItem("isAM") as any);

    
  }
}
