import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private url = 'https://restcountries.com/v3.1/name/';
  constructor(private http: HttpClient) { }

  public getCountry(text: string) {
    return this.http.get(this.url + text);

  }



}
