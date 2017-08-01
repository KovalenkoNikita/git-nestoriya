import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import {HttpService} from "../http.service";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.less']
})
export class SearchPageComponent implements OnInit {

  stateCtrl: FormControl;
  filteredStates: any;
  searchHistory: string[] = ['1','2','3','4'];
  states: string[] = [];

  ngOnInit() {
    this.httpService.getCities()
      .subscribe((resp) => {
        this.states = resp.json()['United Kingdom'];
        return resp.json()['United Kingdom'];
      });
  }

  constructor(private httpService: HttpService, private router: Router) {
    this.getSearchHistory();
    this.stateCtrl = new FormControl();
    this.filteredStates = this.stateCtrl.valueChanges
      .startWith(null)
      .map(name => this.filterStates(name));
    console.log( this.states );
  }

  public filterStates(val: string) {
    return val ? this.states.filter(s => s.toLowerCase().indexOf(val.toLowerCase()) === 0)
      : this.states;
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
  }
  public getSearchHistory() {
    this.searchHistory = window.localStorage.getItem('search_history').split(',');
    console.log('get:');
    console.log( this.searchHistory );
  }
}
