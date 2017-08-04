import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.less']
})
export class SearchPageComponent implements OnInit {
  searchHistory: string[] = [];

  ngOnInit() {
    this.getSearchHistory();
  }

  constructor(private router: Router) {

  }

  public routeCounty(country: string) {
    this.router.navigate([country + '/property/buy/']);
    if ( !(~this.searchHistory.indexOf( country )) ) {
      this.searchHistory.push(country);
      this.setSearchHistory();
    }
  }
  public removeItemSearchHistory(value: string) {
    let index = this.searchHistory.indexOf( value );
    this.searchHistory.splice(index, 1);
    this.setSearchHistory();
    console.log('remove');
    console.log( this.searchHistory );

  }
  public setSearchHistory() {
    window.localStorage.setItem( 'search_history', this.searchHistory.join(',') );
    console.log('2');
  }
  public getSearchHistory() {
    this.searchHistory = window.localStorage.getItem('search_history').split(',');
    if (this.searchHistory[0] === '') {
      this.searchHistory = [];
    }
    console.log('get:');
    console.log( this.searchHistory );
  }
}
