import { Component } from '@angular/core';
import { CountriesService } from '../services/countries.service';
import { ModalController } from '@ionic/angular';
import { ModalStateDetailPage } from '../modal-state-detail/modal-state-detail.page';
import { IonLoaderService } from '../ionLoader/ion-loader.service';
import { AlertController } from '@ionic/angular';
import { Tab2Page } from '../tab2/tab2.page';
import { SplashScreen } from '@capacitor/splash-screen';



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
    public modalCtrl: ModalController,
    private ionLoaderService: IonLoaderService,
    public alertController: AlertController,
    public tab2Page: Tab2Page
  ) {
    this.inputNameOfState = null;
  }


  public btnVyhledatClicked(): void {
    if (this.inputNameOfState.length > 1) {
      this.showLoader();

      this.countriesService.getCountry(this.inputNameOfState).subscribe((data) => {
        //console.log(data);

        this.dataResponse = data;
        console.log('btn vyhledat response: ');
        console.log(this.dataResponse);
        this.hideLoader();
      },
        (error) => {
          console.log('Catch error ');
          this.hideLoader();
          this.showAlertNotFound();
        }
      );
    }
    else {
      console.log('input musi byt vetsi nez 1');
      this.showAlertInputWarning();
    }

  };

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

  showAlertNotFound() {
    this.alertController.create({
      subHeader: 'Nepodařilo se nic najít',
      message: 'Vašemu požadavku neodpovídají žádné výsledky. Zkuste zadat jinou hodnotu.',
      buttons: ['OK']
    }).then(res => {
      res.present();
    });
  }

  showLoader() {
    this.ionLoaderService.simpleLoader();
  }

  hideLoader() {
    this.ionLoaderService.dismissLoader();
  }

  async initModal(indexNumber: any) {
    const modal = await this.modalCtrl.create({
      component: ModalStateDetailPage,
      componentProps: {
        dataResponse: this.dataResponse,
        indexNumber
      }
    });


    modal.onDidDismiss().then((dataResponse) => {
      if (dataResponse !== null) {
        //   this.modalDataResponse = dataResponse;
        console.log('Modal Sent Data : ' + this.dataResponse[indexNumber]);

        // vlozeni do pole s historii
        this.countriesService.addToHistoryArray(this.dataResponse[indexNumber]);
        //this.tab2Page.historyStorage.push(this.dataResponse[indexNumber]);
        this.tab2Page.saveHistory();

      }
    });

    return await modal.present();
  }
}
