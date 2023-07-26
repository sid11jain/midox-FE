import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared/shared.module'; 

import { AddaRoutingModule } from './adda-routing.module';
import { AddAddaComponent } from './add-adda/add-adda.component';
import { ViewAddaComponent } from './view-adda/view-adda.component';
import { AddMaterialComponent } from './add-material/add-material.component';
import { AddPatternComponent } from './add-pattern/add-pattern.component';
import { BundleComponent } from './bundle/bundle.component';
import { JobCardComponent } from './job-card/job-card.component';
import { StickerComponent } from './sticker/sticker.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AddAddaComponent,
    ViewAddaComponent,
    AddMaterialComponent,
    AddPatternComponent,
    BundleComponent,
    JobCardComponent,
    StickerComponent
  ],
  imports: [
    CommonModule,
    AddaRoutingModule,
    SharedModule
  ],
})
export class AddaModule { }
