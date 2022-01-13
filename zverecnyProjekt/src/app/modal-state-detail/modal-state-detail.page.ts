import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FavouritesService } from '../services/favourites/favourites-service.service';

@Component({
  selector: 'app-modal-state-detail',
  templateUrl: './modal-state-detail.page.html',
  styleUrls: ['./modal-state-detail.page.scss'],
})
export class ModalStateDetailPage implements OnInit {
  inputNameOfState: string;
  stateNativeName: string;
  stateNativeNameObj: string;
  stateName: string;
  stateFlag: string;
  stateCode: string;
  stateBorders: string;
  stateCapital: string;
  stateArea: string;
  stateCurrency: Array<string> = [];
  statePopulation: string;
  stateLanguages: string;
  stateDomain: string;
  stateRegion: string;
  stateSubregion: string;
  stateTimezones: string;
  hideContent: boolean;
  modalDataResponse: any;
  dataResponse: any;
  indexNumber: number;

  constructor(
    private modalCtr: ModalController,
    public favouritesService: FavouritesService
  ) { }

  /*
   * innicializace modalniho okna daty
   */
  ngOnInit() {

    // vymazani pole s menou
    this.stateCurrency = [];

    // nalezeni native name v jsonu podle pozice, ne pomoci cesty
    this.stateNativeNameObj = this.dataResponse[this.indexNumber].name.nativeName
    [Object.keys(this.dataResponse[this.indexNumber].name.nativeName)[0]];
    this.stateNativeName = this.stateNativeNameObj[Object.keys(this.stateNativeNameObj)[1]];
    this.stateName = this.dataResponse[this.indexNumber].name.official;
    this.stateFlag = this.dataResponse[this.indexNumber].flags.png;
    this.stateCode = this.dataResponse[this.indexNumber].cca2 + ', ' + this.dataResponse[0].cca3;
    this.stateBorders = this.dataResponse[this.indexNumber].borders;
    this.stateCapital = this.dataResponse[this.indexNumber].capital[0];
    this.stateArea = this.dataResponse[this.indexNumber].area;

    //vypis vsech men
    const keys = Object.keys(this.dataResponse[this.indexNumber].currencies);
    keys.forEach(element => {
      this.stateCurrency.push(this.dataResponse[this.indexNumber].currencies[element].name);
    });

    this.statePopulation = this.dataResponse[this.indexNumber].population;
    this.stateLanguages = this.dataResponse[this.indexNumber].languages;
    this.stateDomain = this.dataResponse[this.indexNumber].tld[0];
    this.stateRegion = this.dataResponse[this.indexNumber].region;
    this.stateSubregion = this.dataResponse[this.indexNumber].subregion;
    this.stateTimezones = this.dataResponse[this.indexNumber].timezones;
  }

  async close() {
    const closeModal = 'Modal Closed';
    await this.modalCtr.dismiss(closeModal);
  }

  /*
   * metoda pro pridani do oblibenych
   * pridani do pole s oblibenymi a ulozeni do pameti
   */
  btnOblibeneClicked() {
    this.favouritesService.addToFavouritesArray(this.dataResponse[this.indexNumber]);
    this.favouritesService.saveFavourites();
  }

  /*
   * metoda pro skryti tlacitka na pridani do oblibenych (hvezdicka)
   * v pripade, ze jiz je polozka mezi oblibenymi je sjryto tlacitko pro pridani
   * => kazda polozka muze byt v oblibenzch pouze 1×
   */
  disableOblibeneBtn() {
    if (this.favouritesService.isInFavouritesArray(this.dataResponse[this.indexNumber])) {
      return false;
    }
    return true;
  }

}
