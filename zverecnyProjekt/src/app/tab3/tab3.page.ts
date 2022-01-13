import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FavouritesService } from '../services/favourites/favourites-service.service';
import { ModalStateDetailPage } from '../modal-state-detail/modal-state-detail.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
    public modalCtrl: ModalController,
    public favouritesService: FavouritesService
  ) { }

  /*
   * volani inicializace modalniho okna pro zobrazeni podrobnosti o konkretni zemi z oblibenych polozek
   */
  async initModal(indexNumber: any) {
    const modal = await this.modalCtrl.create({
      component: ModalStateDetailPage,
      componentProps: {
        dataResponse: this.favouritesService.favouriteArray,
        indexNumber
      }
    });

    return await modal.present();
  }

  /*
   * odstraneni polozky z oblibenych
   * odebrani polozky z pole oblibenych
   * ulozeni zmen do pameti
   */
  deleteFavouriteItem(deltedItem) {
    this.favouritesService.removeFromFavouritesArray(deltedItem);
    this.favouritesService.saveFavourites();
  }

}
