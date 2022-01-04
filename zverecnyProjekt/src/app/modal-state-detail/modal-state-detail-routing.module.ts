import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalStateDetailPage } from './modal-state-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ModalStateDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalStateDetailPageRoutingModule {}
