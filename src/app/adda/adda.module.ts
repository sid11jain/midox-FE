import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddaRoutingModule } from './adda-routing.module';
import { AddAddaComponent } from './add-adda/add-adda.component';
import { ViewAddaComponent } from './view-adda/view-adda.component';
import { AddMaterialComponent } from './add-material/add-material.component';
import { AddPatternComponent } from './add-pattern/add-pattern.component';
import { BundleComponent } from './bundle/bundle.component';
import { JobCardComponent } from './job-card/job-card.component';
import { StickerComponent } from './sticker/sticker.component';


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
    AddaRoutingModule
  ]
})
export class AddaModule { }
