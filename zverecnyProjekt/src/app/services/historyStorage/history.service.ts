import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';


@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  historyArray: any;
  historySavedItems: any;

  constructor() {
    this.historyArray = [];
    this.loadHistory();
    console.log(this.historyArray);
  }

  /*
   * metoda pro nacteni dat (o historii vyhledavani) z pameti
   */
  loadHistory = async () => {

    const getHistoryFromStorage = async () => {
      const { value } = await Storage.get({ key: 'history' });
      // console.log(value);
      return JSON.parse(value);
    };

    this.historySavedItems = [];
    //console.log('nactena historie z pameti: ');
    getHistoryFromStorage().then(responseHistory => {

      if (responseHistory !== null && this.historyArray.length === 0) {
        this.historySavedItems.push(responseHistory);
        this.historySavedItems[0].forEach((currentValue) => {
          this.historyArray.push(currentValue);
        });
      };
    });
  };

  /*
   * metoda pro ulozeni dat (o historii vyhledavani) do pameti
   */
  async saveHistory() {
    await Storage.set({
      key: 'history',
      value: JSON.stringify(this.historyArray),
    });
  }

  /*
   * metoda pro pridani dat do pole se zobrazenymi polozkami (historii)
   */
  addToHistoryArray(itemToAdd: any) {
    this.historyArray.push(itemToAdd);
  }

}
