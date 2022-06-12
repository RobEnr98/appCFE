import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnexoPdfPage } from './anexo-pdf.page';

const routes: Routes = [
  {
    path: '',
    component: AnexoPdfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnexoPdfPageRoutingModule {}
