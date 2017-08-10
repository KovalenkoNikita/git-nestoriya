import {Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.less']
})
export class FilterListComponent implements OnInit {

  @Output() changeFilter: EventEmitter<any> = new EventEmitter();
  private subscription: Subscription;
  private place_name: string;
  private listing_type: string;
  private sort: string = 'nestoria_rank';
  private property_type: string = 'all';
  private filter: any = {};
  private sortOptions = [
    {value: 'nestoria_rank', viewValue: 'Nestoria Rank'},
    {value: 'price_lowhigh', viewValue: 'Price (low to high)'},
    {value: 'price_highlow', viewValue: 'Price (high to low)'},
    {value: 'bedroom_lowhigh', viewValue: 'Beds (fewer first)'},
    {value: 'bedroom_highlow', viewValue: 'Beds (more first)'},
    {value: 'oldest', viewValue: 'Date (older first)'},
    {value: 'newest ', viewValue: 'Date (newer first)'}
  ];
  private bedOptions = [
    {text: 'Studio', value: 0, cols: 2, rows: 1},
    {text: '1', value: 1, cols: 1, rows: 1},
    {text: '2', value: 2, cols: 1, rows: 1},
    {text: '3', value: 3, cols: 1, rows: 1},
    {text: '4+', value: 4, cols: 1, rows: 1},
  ];
  private propertyTypes = [
    {text: 'all', cols: 1, rows: 1, active: true},
    {text: 'flat', cols: 1, rows: 1, active: false},
    {text: 'house', cols: 1, rows: 1, active: false},
  ];
  private bathOptions = [
    {text: '1', value: 1, cols: 1, rows: 1},
    {text: '2', value: 2, cols: 1, rows: 1},
    {text: '3', value: 3, cols: 1, rows: 1},
    {text: '4+', value: 4, cols: 1, rows: 1},
  ];

  constructor(private router: Router,
              private activateRoute: ActivatedRoute) {

  }
  ngOnInit() {
    this.subscription = this.activateRoute.params.subscribe((params): any => {
      this.place_name = params['city'];
      this.listing_type = params['listing_type'];
    });
  }
  public toggleTile(tile: any, title: string) {
    tile.active = !tile.active;
    let tmpArray = [];
    if ( tile.active ) {
      if (this.filter[title]) {
        tmpArray = this.filter[title].split(',');
      }
      tmpArray.push(tile.value);
      this.filter[title] = tmpArray.join(',');
    } else {
      tmpArray = this.filter[title].split(',');
      let index = tmpArray.indexOf(tile.value);
      tmpArray.splice(index, 1);
      if ( tmpArray.length === 0) {
        delete this.filter[title];
      } else {
        this.filter[title] = tmpArray.join(',');
      }
    }
    this.getUpFilter();
  }
  public selectProperty(value: any) {
    for ( let tile of this.propertyTypes) {
      if (tile.text === value) {
        if (  tile.active === false) {
          this.property_type = tile.text;
          if (this.property_type !== 'all') {
            this.filter.property_type = this.property_type;
          } else {
            delete this.filter.property_type;
          }
          this.getUpFilter();
        }
        tile.active = true;
      } else {
        tile.active = false;
      }
    }
  }
  public changeListingType(value: string) {
    this.listing_type = value;
    this.getUpFilter();
  }
  private getUpFilter() {
    this.router.navigate([this.place_name, 'property', this.listing_type], { queryParams: this.filter} );
    //this.changeFilter.emit(this.filter);
  }
}
