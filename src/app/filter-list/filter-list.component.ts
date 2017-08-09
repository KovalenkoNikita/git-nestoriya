import {Component, Output, EventEmitter } from '@angular/core';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.less']
})
export class FilterListComponent {

  listing_type: string  = 'buy';
  @Output() changeFilter: EventEmitter<any> = new EventEmitter();
  bathroom: any=  [];
  bedroom: any=  [];
  filter: any = {
    listing_type: 'buy',
    sort: 'nestoria_rank',
    property_type: 'All',
    bedroom_min: 0,
    bedroom_max: 20,
    bathroom_min: 0,
    bathroom_max: 20,
  };
  sortOptions = [
    {value: 'nestoria_rank', viewValue: 'Nestoria Rank'},
    {value: 'price_lowhigh', viewValue: 'Price (low to high)'},
    {value: 'price_highlow', viewValue: 'Price (high to low)'},
    {value: 'bedroom_lowhigh', viewValue: 'Beds (fewer first)'},
    {value: 'bedroom_highlow', viewValue: 'Beds (more first)'},
    {value: 'oldest', viewValue: 'Date (older first)'},
    {value: 'newest ', viewValue: 'Date (newer first)'}
  ];

  bedOptions = [
    {text: 'Studio', value: 0, cols: 2, rows: 1},
    {text: '1', value: 1, cols: 1, rows: 1},
    {text: '2', value: 2, cols: 1, rows: 1},
    {text: '3', value: 3, cols: 1, rows: 1},
    {text: '4+', value: 20, cols: 1, rows: 1},
  ];
  propertyTypes = [
    {text: 'All', cols: 1, rows: 1, active: true},
    {text: 'Flat', cols: 1, rows: 1, active: false},
    {text: 'House', cols: 1, rows: 1, active: false},
  ];
  bathOptions = [
    {text: '1', value: 1, cols: 1, rows: 1},
    {text: '2', value: 2, cols: 1, rows: 1},
    {text: '3', value: 3, cols: 1, rows: 1},
    {text: '4+', value: 20, cols: 1, rows: 1},
  ];

  constructor() {

  }
  public toggleTile(tile: any, title: string) {
    tile.active = !tile.active;
    if ( tile.active ) {
      this[title].push(tile.value);
    } else {
      console.log(tile.value);
      let index = this[title].indexOf(tile.value);
      this[title].splice(index, 1);
    }
   /* if (this[title].length !== 0) {
      console.log(this[title] + '====' + Math.min(this[title]));
      this.filter[title + '_min'] = Math.min(this[title]);
      this.filter[title + '_max'] = Math.max(this[title]);
    } else {
      this.filter[title + '_min'] = 0;
      this.filter[title + '_max'] = 20;
    }*/

    this.getUpFilter();
  }
  public selectProperty(value: any) {
    for ( let tile of this.propertyTypes) {
      if (tile.text === value) {
        if (  tile.active === false) {
          this.filter.property_type = tile.text;

          this.getUpFilter();
          //reload
        }
        tile.active = true;
      } else {
        tile.active = false;
      }
    }
  }
  public changeListingType(value: string) {
    this.listing_type = value;
    this.filter.listing_type = value;
    this.getUpFilter();
  }
  private getUpFilter() {
    this.changeFilter.emit(this.filter);
  }
}
