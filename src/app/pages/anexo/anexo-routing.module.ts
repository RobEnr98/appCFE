import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnexoPage } from './anexo.page';

const routes: Routes = [
  {
    path: '',
    component: AnexoPage
  },
  {
    path: 'anexo-pdf',
    loadChildren: () => import('./anexo-pdf/anexo-pdf.module').then( m => m.AnexoPdfPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnexoPageRoutingModule {}
