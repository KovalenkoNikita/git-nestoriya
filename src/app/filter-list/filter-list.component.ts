import {Component } from '@angular/core';
import {FormControl} from '@angular/forms';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.less']
})
export class FilterListComponent {

  selectedValue: string = 'nestoria_rank';

  sortOptions = [
    {value: 'nestoria_rank', viewValue: 'Nestoria Rank'},
    {value: 'price_lowhigh', viewValue: 'Price (low to high)'},
    {value: 'price_highlow', viewValue: 'Price (high to low)'},
    {value: 'bedroom_lowhigh', viewValue: 'Beds (fewer first)'},
    {value: 'bedroom_highlow', viewValue: 'Beds (more first)'},
    {value: 'oldest', viewValue: 'Date (older first)'},
    {value: 'newest ', viewValue: 'Date (newer first)'}
  ];

  tiles = [
    {text: 'Studio', cols: 2, rows: 1},
    {text: '1', cols: 1, rows: 1},
    {text: '2', cols: 1, rows: 1},
    {text: '3', cols: 1, rows: 1},
    {text: '4', cols: 1, rows: 1},
  ];

  constructor() {

  }
  public toggleBeds(tile: any) {
    tile.active = !tile.active;
    if ( tile.active ) {
      tile.background = '#666';
      tile.color = 'orange';
    } else {
      tile.background = 'white';
      tile.color = 'black';
    }
  }
}
