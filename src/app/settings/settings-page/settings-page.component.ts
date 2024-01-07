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
    this.isAdmin = JSON.parse(sessionStorage.getItem("isAdmin") as any);
    this.isIM = JSON.parse(sessionStorage.getItem("isIM") as any);
    this.isADM = JSON.parse(sessionStorage.getItem("isADM") as any);
    this.isJM = JSON.parse(sessionStorage.getItem("isJM") as any);
    this.isDM = JSON.parse(sessionStorage.getItem("isDM") as any);
    this.isAM = JSON.parse(sessionStorage.getItem("isAM") as any);

    
  }
}
