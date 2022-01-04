import { Component, Injectable } from '@angular/core';
import { CountriesService } from '../services/countries.service';
import { Storage } from '@capacitor/storage';
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
  historyStorage: any;
  historySaved: any;

  constructor(
    private countriesService: CountriesService,
    public modalCtrl: ModalController,
  ) {
    this.historyStorage = [];
    this.loadHistory();
    this.printHistory();
  }


  loadHistory = async () => {

    const getHistoryFromStorage = async () => {
      const { value } = await Storage.get({ key: 'history' });
      // console.log(value);
      return JSON.parse(value);
    };

    this.historySaved = [];
    //console.log('nactena historie z pameti: ');
    getHistoryFromStorage().then(responseHistory => {

      if (responseHistory !== null && this.historyStorage.length === 0) {
        this.historySaved.push(responseHistory);
        this.historySaved[0].forEach((currentValue) => {
          this.historyStorage.push(currentValue);
        });
      };
    });
  };

  printHistory() {
    this.historyStorage = this.countriesService.returnHistoryArray();
    console.log(this.historyStorage);
  }

  async initModal(indexNumber: any) {
    const modal = await this.modalCtrl.create({
      component: ModalStateDetailPage,
      componentProps: {
        dataResponse: this.historyStorage,
        indexNumber
      }
    });

    modal.onDidDismiss().then((data) => {
      if (data !== null) {
        //console.log('historyModal index : ' + indexNumber);
        //console.log('historyModal Sent Data : ' + this.historyStorage[indexNumber]);
      }
    });

    return await modal.present();
  }

  async saveHistory() {
    await Storage.set({
      key: 'history',
      value: JSON.stringify(this.historyStorage),
    });

  }
}
