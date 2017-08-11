import { Injectable } from '@angular/core';
import { Country } from './country';

@Injectable()
export class DataService {
  currSearchHistory: string[] = [];
  currCountry: Country = {
    api: 'https://api.nestoria.co.uk',
    nameCountry: 'United Kingdom',
    abbreviation: 'uk'
  };
  countries: Country[] = [
    {api: 'https://api.nestoria.com.au',  nameCountry: 'Australia',   abbreviation: 'au'},
    {api: 'https://api.nestoria.com.br',  nameCountry: 'Brazil',   abbreviation: 'br'},
    {api: 'https://api.nestoria.de',  nameCountry: 'Germany',   abbreviation: 'de'},
    {api: 'https://api.nestoria.es',  nameCountry: 'Spain',   abbreviation: 'es'},
    {api: 'https://api.nestoria.fr',  nameCountry: 'France',   abbreviation: 'fr'},
    {api: 'https://api.nestoria.in',  nameCountry: 'India',   abbreviation: 'in'},
    {api: 'https://api.nestoria.it',  nameCountry: 'Italy',   abbreviation: 'it'},
    {api: 'https://api.nestoria.mx',  nameCountry: 'Mexico',   abbreviation: 'mx'},
    {api: '	https://api.nestoria.co.uk',  nameCountry: 'United Kingdom',   abbreviation: 'uk'},
  ];
  constructor() { }

  public removeCityFromHistory(city: string) {
    let index = this.currSearchHistory.indexOf( city );
    this.currSearchHistory.splice(index, 1);
    this.setSearchHistory();
  }
  public addCityToHistory(city: string) {
    if ( !(~this.currSearchHistory.indexOf( city )) ) {
      this.currSearchHistory.push( city );
      this.setSearchHistory();
    }
  }
  private setSearchHistory() {
    window.localStorage.setItem('search_history_' + this.currCountry.abbreviation, this.currSearchHistory.join(',') );
  }
  public getCurrHistory() {
    if (window.localStorage.getItem('search_history_' + this.currCountry.abbreviation) === null) {
      this.currSearchHistory = [];
    } else {
      this.currSearchHistory = window.localStorage.getItem('search_history_' + this.currCountry.abbreviation).split(',');
      if (this.currSearchHistory[0] === '') {
        this.currSearchHistory = [];
      }
    }
    return this.currSearchHistory;
  }
  public setCurrCountry(country) {
    if ( this.currCountry !== country) {
      this.currCountry = country;
      window.localStorage.setItem( 'curr_country', JSON.stringify(this.currCountry) );
    }
  }
  public getCurrCountry() {
    if (JSON.parse( window.localStorage.getItem('curr_country') ) !== null) {
      this.currCountry = JSON.parse(window.localStorage.getItem('curr_country'));
    }
    return this.currCountry;
  }
  public getCountries() {
    return this.countries;
  }
}
