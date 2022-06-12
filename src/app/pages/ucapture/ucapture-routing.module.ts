import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UcapturePage } from './ucapture.page';

const routes: Routes = [
  {
    path: '',
    component: UcapturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UcapturePageRoutingModule {}
