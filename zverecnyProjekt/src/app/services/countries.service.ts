import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  tmpHistoryArray: string[];
  private url = 'https://restcountries.com/v3.1/name/';


  constructor(private http: HttpClient) {
    this.tmpHistoryArray = [];
   }

  public getCountry(text: string) {
    return this.http.get(this.url + text);
  }

  public addToHistoryArray(itemToAdd: any){
    this.tmpHistoryArray.push(itemToAdd);
  }

  public returnHistoryArray(){
    return this.tmpHistoryArray;
  }


}
