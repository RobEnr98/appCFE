import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnexoPdfPageRoutingModule } from './anexo-pdf-routing.module';

import { AnexoPdfPage } from './anexo-pdf.page';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PdfViewerModule,
    AnexoPdfPageRoutingModule,
  ],
  declarations: [AnexoPdfPage]
})
export class AnexoPdfPageModule {}
