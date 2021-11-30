import { Component } from '@angular/core';
import { CountriesService } from '../api/countries.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
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

  constructor(private countriesService: CountriesService) {

  }

  public btnVyhledatClicked(): void {
    this.countriesService.getCountry(this.inputNameOfState).subscribe((data) => {
      console.log(data);

      // vymazani pole s menou
      this.stateCurrency = [];

      // nalezeni native name v jsonu podle pozice, ne pomoci cesty
      this.stateNativeNameObj = data[0].name.nativeName[Object.keys(data[0].name.nativeName)[0]];
      this.stateNativeName = this.stateNativeNameObj[Object.keys(this.stateNativeNameObj)[1]];
      this.stateName = data[0].name.official;
      this.stateFlag = data[0].flags.png;
      this.stateCode = data[0].cca2 + ', ' + data[0].cca3;
      this.stateBorders = data[0].borders;
      this.stateCapital = data[0].capital[0];
      this.stateArea = data[0].area;

      //vypis vsech men
      const keys = Object.keys(data[0].currencies);
      keys.forEach(element => {
        this.stateCurrency.push(data[0].currencies[element].name);
      });

      this.statePopulation = data[0].population;
      this.stateLanguages = data[0].languages;
      this.stateDomain = data[0].tld[0];
      this.stateRegion = data[0].region;
      this.stateSubregion = data[0].subregion;
      this.stateTimezones = data[0].timezones;
    });
  }

  hide() {
    this.hideContent = true;
  }

}
