import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnexoPageRoutingModule } from './anexo-routing.module';

import { AnexoPage } from './anexo.page';
import { ModuloModule } from '../../commons/modulo.module';
import { AnexoPdfPage } from './anexo-pdf/anexo-pdf.page';
import { AnexoPdfPageModule } from './anexo-pdf/anexo-pdf.module';

@NgModule({
  entryComponents: [
    AnexoPdfPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnexoPageRoutingModule,
    ModuloModule,
    AnexoPdfPageModule
  ],
  declarations: [AnexoPage]
})
export class AnexoPageModule {}
