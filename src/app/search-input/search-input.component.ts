import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { HttpService } from '../http.service';
import { DataService } from '../data.service';
import { Country } from '../country';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.less']
})
export class SearchInputComponent implements OnInit {
  private stateCtrl: FormControl;
  private filteredStates: any;
  @Input() currCountry: Country;
  private states: string[] = [];
  static onRouteClick = new Subject();

  constructor(private httpService: HttpService,
              private router: Router,
              private dataService: DataService) {

  }
  ngOnInit() {
    this.getCurrCountry();
    this.stateCtrl = new FormControl();
    this.filteredStates = this.stateCtrl.valueChanges
      .startWith(null)
      .map(name => this.filterStates(name));
  }
  public reload() {
    this.httpService.getCities()
      .subscribe((resp) => {
        this.states = resp.json()[this.currCountry.nameCountry];
      });
  }
  public filterStates(val: string) {
    return val ? this.states.filter(s => s.toLowerCase().indexOf(val.toLowerCase()) === 0)
      : this.states;
  }
  public routeCity(city: string) {
    this.router.navigate([city + '/property/buy/']);
    this.dataService.addCityToHistory(city);
  }
  public getCurrCountry() {
    this.currCountry = this.dataService.getCurrCountry();
  }
}
