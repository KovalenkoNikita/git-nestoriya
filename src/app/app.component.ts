import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from './translate/translate.service';
import { DataService } from './data.service';
import { Country } from './country';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, AfterViewInit  {
  private currCountry: Country;
  constructor(private router: Router,
              private dataService: DataService,
              private _translate: TranslateService) {
  }
  ngOnInit() {
    this.currCountry = this.dataService.getCurrCountry();
    this.setCurrlanguage();
  }
  ngAfterViewInit () {
    document.body.className = 'loaded';
  }
  public setCurrlanguage() {
    this.selectLang( this.currCountry.abbreviation );
  }
  public selectLang(lang: string) {
    console.log(lang);
    this._translate.use(lang);
  }
  public routeToFavesPage() {
    this.router.navigate(['/faves/1']);
  }
  public routeToMap() {
    this.router.navigate(['map']);
  }
}
