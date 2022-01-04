import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalStateDetailPageRoutingModule } from './modal-state-detail-routing.module';

import { ModalStateDetailPage } from './modal-state-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalStateDetailPageRoutingModule
  ],
  declarations: [ModalStateDetailPage]
})
export class ModalStateDetailPageModule {}
