import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UcapturePageRoutingModule } from './ucapture-routing.module';

import { UcapturePage } from './ucapture.page';
import { ModuloModule } from '../../commons/modulo.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UcapturePageRoutingModule,
    ModuloModule
  ],
  declarations: [UcapturePage]
})
export class UcapturePageModule {}
