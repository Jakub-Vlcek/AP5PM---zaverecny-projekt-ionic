import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  favouriteArray: any;
  favouriteSavedItems: any;

  constructor() {
    this.favouriteArray = [];
    this.loadFavourites();
    console.log(this.favouriteArray);
  }

  /*
   * metoda pro nacteni dat (oblibenych polozek) z pameti
   */
  loadFavourites = async () => {

    const getFavFromStorage = async () => {
      const { value } = await Storage.get({ key: 'favourites' });
      // console.log(value);
      return JSON.parse(value);
    };

    this.favouriteSavedItems = [];
    //console.log('nactene oblibene z pameti: ');
    getFavFromStorage().then(responseFav => {

      if (responseFav !== null && this.favouriteArray.length === 0) {
        this.favouriteSavedItems.push(responseFav);
        this.favouriteSavedItems[0].forEach((currentValue) => {
          this.favouriteArray.push(currentValue);
        });
      };
    });
  };

  /*
   * metoda pro ulozeni dat (oblibenych polozek) do pameti
   */
  async saveFavourites() {
    await Storage.set({
      key: 'favourites',
      value: JSON.stringify(this.favouriteArray),
    });

  }

  /*
   * metoda pro pridani dat do pole s oblibenymi polozkami)
   */
  public addToFavouritesArray(itemToAdd: any) {
    this.favouriteArray.push(itemToAdd);
    console.log(this.favouriteArray);
  }

  /*
   * metoda pro odebrani dat z pole s oblibenymi polozkami)
   */
  public removeFromFavouritesArray(itemToRemove: any) {
    console.log('item to remove: ');
    console.log(itemToRemove);

    this.favouriteArray.forEach((element, index) => {
      //console.log(element);

      if (element === itemToRemove) {
        // console.log('mazu: ');
        // console.log(itemToRemove);
        this.favouriteArray.splice(index, 1);
      }
    });
  }

  /*
   * metoda pro overeni, zda se data z paramtru vykytuji v poli s oblibenymi polozkami
   */
  public isInFavouritesArray(item: any) {
    let retValue = false;
    this.favouriteArray.forEach((element) => {
      if (JSON.stringify(element) === JSON.stringify(item)) {
        retValue = true;
      }
    });
    return retValue;
  }

}
