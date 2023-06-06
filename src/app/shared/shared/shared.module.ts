import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule} from '@angular/material/menu';
import { NgChartsModule } from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxDataGridModule } from 'devextreme-angular';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgChartsModule,
    MatMenuModule,
    MatIconModule,
    // BrowserModule,
    DxDataGridModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  exports: [
    CommonModule,
    NgChartsModule,
    MatMenuModule,
    MatIconModule,
    // BrowserModule,
    DxDataGridModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatButtonModule
  ]
})
export class SharedModule { }
