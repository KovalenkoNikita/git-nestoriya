import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { DataService } from '../data.service';
import { Country } from '../country';
import { SearchInputComponent } from '../search-input/search-input.component';
import { TranslateService } from '../translate/translate.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.less']
})
export class SearchPageComponent implements OnInit {
  private currSearchHistory: string[] = [];
  private currCountry: Country;
  private countries: Country[];
  @ViewChild(SearchInputComponent) childComponent: SearchInputComponent;
  constructor(private router: Router,
              private dataService: DataService,
              private _translate: TranslateService) {

  }
  ngOnInit() {
    this.getCountries();
    this.getCurrCountry();
  }
 public setCurrlanguage() {
    this.selectLang( this.currCountry.abbreviation );
  }
  public selectLang(lang: string) {
    this._translate.use(lang);
  }
  public routeCity(city: string) {
    this.router.navigate([city + '/property/buy/']);
    this.dataService.addCityToHistory(city);
  }
  public removeItem(city: string) {
    this.dataService.removeCityFromHistory(city);
  }
  public getCountries() {
    this.countries = this.dataService.getCountries();
  }
  public setCurrCountry(country) {
    this.dataService.setCurrCountry(country);
    this.getCurrCountry();
  }
  public getCurrCountry() {
    this.currCountry = this.dataService.getCurrCountry();
    this.childComponent.reload();
    this.getCurrHistory();
    this.setCurrlanguage();
  }
  public getCurrHistory() {
    this.currSearchHistory = this.dataService.getCurrHistory();
  }
}
