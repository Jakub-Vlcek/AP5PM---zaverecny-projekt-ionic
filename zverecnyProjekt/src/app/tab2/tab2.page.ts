import { Component, Injectable } from '@angular/core';
import { HistoryService } from '../services/historyStorage/history.service';
import { ModalController } from '@ionic/angular';
import { ModalStateDetailPage } from '../modal-state-detail/modal-state-detail.page';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

@Injectable({
  providedIn: 'root'
})

export class Tab2Page {
  constructor(
    public modalCtrl: ModalController,
    public historyStorage: HistoryService
  ) { }

  /*
   * volani inicializace modalniho okna pro zobrazeni podrobnosti o konkretni zemi z historie
   */
  async initModal(indexNumber: any) {
    const modal = await this.modalCtrl.create({
      component: ModalStateDetailPage,
      componentProps: {
        dataResponse: this.historyStorage.historyArray,
        indexNumber
      }
    });

    return await modal.present();
  }

}
