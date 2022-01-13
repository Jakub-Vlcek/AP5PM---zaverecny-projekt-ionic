import { Component } from '@angular/core';
import { CountriesService } from '../services/countries/countries.service';
import { ModalController } from '@ionic/angular';
import { ModalStateDetailPage } from '../modal-state-detail/modal-state-detail.page';
import { IonLoaderService } from '../services/ionLoader/ion-loader.service';
import { AlertController } from '@ionic/angular';
import { HistoryService } from '../services/historyStorage/history.service';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  inputNameOfState: string;
  dataResponse: any;

  constructor(
    private countriesService: CountriesService,
    public historyStorage: HistoryService,
    public modalCtrl: ModalController,
    private ionLoaderService: IonLoaderService,
    public alertController: AlertController,
    public loadingController: LoadingController
  ) {
    this.inputNameOfState = null;
  }


  /*
   * metoda pro vyhledani vysledku
   * pokud je zadan validni input, tak se vola getCountry k ziskani vysledku ze serveru (API)
   * pokud neni zadan validni input, je zobrazeno upozorneni
   * po dobu dotazu se zobrazuje dialog nacitani
   * v pripade neuspechu je zobrazeno upozorneni
   */
  public btnVyhledatClicked(): void {

    if (this.inputNameOfState) {
      if (this.inputNameOfState.length > 1) {
        this.showLoader();

        this.countriesService.getCountry(this.inputNameOfState).subscribe((data) => {
          console.log(data);

          this.dataResponse = data;
          this.hideLoader();
        },
          (error) => {
            //console.log('Catch error ');
            //console.log(error);
            this.hideLoader();
            this.showAlertNotFound();
          }
        );
      }
    } else {
      // console.log('input musi byt vetsi nez 1');
      this.showAlertInputWarning();
    }
  };

  /*
   * volani inicializace modalniho okna pro zobrazeni podrobnosti o konkretni zemi ze seznamu nalezenzch vysledku
   */
  async initModal(indexNumber: any) {
    const modal = await this.modalCtrl.create({
      component: ModalStateDetailPage,
      componentProps: {
        dataResponse: this.dataResponse,
        indexNumber
      }
    });

    /*
     * pri zavirani modalniho okna se pridava zobrazovana polozka do pole s historii
     * nasledne dojde k ulozeni historie do pameti
     */
    modal.onDidDismiss().then((dataResponse) => {
      if (dataResponse !== null) {
        // console.log('Modal Sent Data : ' + this.dataResponse[indexNumber]);

        // vlozeni do pole s historii
        this.historyStorage.addToHistoryArray(this.dataResponse[indexNumber]);
        this.historyStorage.saveHistory();
      }
    });

    return await modal.present();
  }

  /*
   * vytvoreni alertu pro pripad, kdy nebyl zadan validni input
   */
  showAlertInputWarning() {
    this.alertController.create({
      header: 'Upozornění',
      subHeader: 'Nezadali jste validní název státu',
      message: 'Název státu musí obsahovat alespoň dvě písmena',
      buttons: ['OK']
    }).then(res => {
      res.present();
    });
  }

  /*
   * vytvoreni alertu pro pripad, kdy se nepodarilo ziskat data ze serveru
   */
  showAlertNotFound() {
    this.alertController.create({
      subHeader: 'Nepodařilo se nic najít',
      message: 'Vašemu požadavku neodpovídají žádné výsledky. Zkuste prosím zadat jinou hodnotu nebo ověřit připojení k internetu',
      buttons: ['OK']
    }).then(res => {
      res.present();
    });
  }

  /*
   * pomocna metoda pro zobrazeni dialogu o nacitani
   */
  showLoader() {
    this.ionLoaderService.simpleLoader();
  }

  /*
   * pomocna metoda pro skryti dialogu o nacitani
   */
  hideLoader() {
    this.ionLoaderService.dismissLoader();
  }

}


