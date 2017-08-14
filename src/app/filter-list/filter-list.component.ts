import {Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { IonRangeSliderComponent } from 'ng2-ion-range-slider';

declare var $: any;

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.less']
})
export class FilterListComponent implements OnInit {
  private subscription: Subscription;
  private querySubscription: Subscription;
  private place_name: string;
  private listing_type: string;
  private filter: any = {
    sort: 'nestoria_rank',
    bathrooms: '',
    bedrooms: '',
    property_type: 'all',
    price_min: 0,
    price_max: 1000000
  };
  private sortOptions = [
    {value: 'nestoria_rank', viewValue: 'Nestoria Rank'},
    {value: 'price_lowhigh', viewValue: 'Price (low to high)'},
    {value: 'price_highlow', viewValue: 'Price (high to low)'},
    {value: 'bedroom_lowhigh', viewValue: 'Beds (fewer first)'},
    {value: 'bedroom_highlow', viewValue: 'Beds (more first)'},
    {value: 'oldest', viewValue: 'Date (older first)'},
    {value: 'newest ', viewValue: 'Date (newer first)'}
  ];
  private bedrooms = [
    {text: 'Studio', value: '0', cols: 2, rows: 1, active: false},
    {text: '1', value: '1', cols: 1, rows: 1, active: false},
    {text: '2', value: '2', cols: 1, rows: 1, active: false},
    {text: '3', value: '3', cols: 1, rows: 1, active: false},
    {text: '4+', value: '4', cols: 1, rows: 1, active: false},
  ];
  private propertyTypes = [
    {text: 'all', cols: 1, rows: 1, active: true},
    {text: 'flat', cols: 1, rows: 1, active: false},
    {text: 'house', cols: 1, rows: 1, active: false},
  ];
  private bathrooms = [
    {text: '1', value: '1', cols: 1, rows: 1, active: false},
    {text: '2', value: '2', cols: 1, rows: 1, active: false},
    {text: '3', value: '3', cols: 1, rows: 1, active: false},
    {text: '4+', value: '4', cols: 1, rows: 1, active: false},
  ];

  constructor(private router: Router,
              private activateRoute: ActivatedRoute) {

  }
  ngOnInit() {
    this.subscription = this.activateRoute.params.subscribe((params): any => {
      this.place_name = params['city'];
      this.listing_type = params['listing_type'];
    });
    this.querySubscription = this.activateRoute.queryParams.subscribe(
      (queryParam: any) => {
        for ( let key in queryParam ) {
          this.filter[key] = queryParam[key];
          switch (key) {
            case 'bathrooms':
              for ( let obj of this.bathrooms) {
                if ( ~this.filter.bathrooms.indexOf(obj.value) ) {
                  obj.active = true;
                }
              }
              break;
            case 'bedrooms':
              for ( let obj of this.bedrooms) {
                if ( ~this.filter.bedrooms.indexOf(obj.value) ) {
                  obj.active = true;
                }
              }
              break;
            case 'property_type':
              for ( let obj of this.propertyTypes) {
                if ( ~this.filter.property_type.indexOf(obj.text) ) {
                  obj['active'] = true;
                } else {
                  obj['active'] = false;
                }
              }
              break;
          }
        }
      }
    );
  }
  public toggleTile(tile: any, title: string) {
    tile.active = !tile.active;
    let tmpArray = [];
    tmpArray = this.filter[title].split(',');
    if ( tile.active ) {
      if (tmpArray[0] === '') {
        tmpArray = [];
      }
      tmpArray.push(tile.value);
    } else {
      let index = tmpArray.indexOf(tile.value);
      tmpArray.splice(index, 1);
    }
    this.filter[title] = tmpArray.join(',');
    this.getUpFilter();
  }
  public selectProperty(value: any) {
    for ( let tile of this.propertyTypes) {
      if (tile.text === value) {
        if ( tile.active === false) {
          this.filter.property_type = tile.text;
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
  public myOnFinish(event) {
    this.filter.price_min = event.from;
    this.filter.price_max = event.to;
    console.log(this.filter);
    this.getUpFilter();
  }
  private getUpFilter() {
    let filter = {};
    let defaultFilter: any = {
      sort: 'nestoria_rank',
      bathrooms: '',
      bedrooms: '',
      property_type: 'all',
      price_min: 0,
      price_max: 1000000
    };
    for ( let key in this.filter ) {
      if (this.filter[key] !== defaultFilter[key]) {
        filter[key] = this.filter[key];
      }
    }
    this.router.navigate([this.place_name, 'property', this.listing_type], { queryParams: filter} );
  }
}
