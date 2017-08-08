import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.less']
})
export class SearchInputComponent implements OnInit {

  stateCtrl: FormControl;
  filteredStates: any;
  searchHistory: string[] = [];
  states: string[] = [];
  static onRouteClick = new Subject();

  constructor(private httpService: HttpService,
              private router: Router) { }

  ngOnInit() {
    this.getSearchHistory();
    this.stateCtrl = new FormControl();
    this.filteredStates = this.stateCtrl.valueChanges
      .startWith(null)
      .map(name => this.filterStates(name));

    this.httpService.getCities()
      .subscribe((resp) => {
        this.states = resp.json()['United Kingdom'];
        return resp.json()['United Kingdom'];
      });
  }
  public filterStates(val: string) {
    return val ? this.states.filter(s => s.toLowerCase().indexOf(val.toLowerCase()) === 0)
      : this.states;
  }
  public routeCounty(country: string) {
    SearchInputComponent.onRouteClick.next(country);
    this.router.navigate([country + '/property/buy/']);
    if ( !(~this.searchHistory.indexOf( country )) ) {
      this.searchHistory.push( country );
      this.setSearchHistory();
    }
  }
  public setSearchHistory() {
    window.localStorage.setItem( 'search_history', this.searchHistory.join(',') );
  }
  public getStateCtrl(value: string) {
  }
  public getSearchHistory() {
    this.searchHistory = window.localStorage.getItem('search_history').split(',');
    if (this.searchHistory[0] === '') {
      this.searchHistory = [];
    }
  }
}
