import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { DataService } from '../data.service';
import { Country } from '../country';
import { SearchInputComponent } from '../search-input/search-input.component';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.less']
})
export class SearchPageComponent implements OnInit {
  currSearchHistory: string[] = [];
  currCountry: Country;
  countries: Country[];
  static updateStates = new Subject();
  @ViewChild(SearchInputComponent) childComponent: SearchInputComponent;
  constructor(private router: Router,
              private dataService: DataService) {

  }
  ngOnInit() {
    this.getCountries();
    this.getCurrCountry();
    this.getCurrHistory();
  }
  public routeCity(city: string) {
    this.router.navigate([city + '/property/buy/']);
    this.dataService.addCityToHistory(city);
  }
  public removeItem(city: string) {
    this.dataService.removeCityFromHistory(city);
  }
  public getCurrHistory() {
    this.currSearchHistory = this.dataService.getCurrHistory();
    console.log(this.currSearchHistory);
  }
  public setCurrCountry(country) {
    this.dataService.setCurrCountry(country);
    this.getCurrCountry();
  }
  public getCurrCountry() {
    this.currCountry = this.dataService.getCurrCountry();
    console.log(this.currCountry);
    this.childComponent.reload();
    this.getCurrHistory();
  }
  public getCountries() {
    this.countries = this.dataService.getCountries();
    console.log(this.countries);
  }
}
