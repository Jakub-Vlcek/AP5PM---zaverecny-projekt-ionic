import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class IonLoaderService {
  loader: any;

  constructor(
    public loadingController: LoadingController
  ) { }

  /*
   * metoda pro zobrazeni dialogu o nacitani
   */
  simpleLoader() {
    this.loader = this.loadingController.create({
      message: 'Načítám data...',
      duration: 3000
    }).then((response) => {
      response.present();
    });
  }

  /*
   * metoda pro zavreni dialogu o nacitani
   */
  dismissLoader() {
    this.loadingController.dismiss().then((response) => {
      console.log('Loader closed!', response);
    }).catch((err) => {
      console.log('Error occured : ', err);
    });
  }
}
