import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { HttpService } from "../http.service";
import { SearchInputComponent } from "../search-input/search-input.component";
import { Country } from '../country';
import { DataService } from '../data.service';

@Component({
  selector: 'app-realty-page',
  templateUrl: './realty-page.component.html',
  styleUrls: ['./realty-page.component.less']
})
export class RealtyPageComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private querySubscription: Subscription;
  @ViewChild(SearchInputComponent) childComponent: SearchInputComponent;
  private viewFilter: boolean;
  private hiddenLoader: boolean = true;
  private length = 80;
  private pageSize = 10;
  private pageSizeOptions = [5, 10, 25];

  private request: any = {
    callback: 'JSONP_CALLBACK',
    encoding: 'json',
    action: 'search_listings',
    number_of_results: this.pageSize,
    page: 1,
  };
  private currCountry: Country;
  private myFaves:  any = [];
  private response: any = {};
  private listings: any = [];

  constructor(private httpService: HttpService,
              private activateRoute: ActivatedRoute,
              private dataService: DataService,
              private dialog: MdDialog) {
  }
  public ngOnInit() {
    this.currCountry = this.dataService.getCurrCountry();
    if (window.innerWidth < 800) {
      this.viewFilter = false;
    } else {
      this.viewFilter = true;
    }
    this.childComponent.reload();
    this.readingAddressBar();

    SearchInputComponent.onRouteClick.subscribe((country) => {
      this.request['place_name'] = country;
      this.requestToApi();
    });
  }
  private readingAddressBar() {
    this.subscription = this.activateRoute.params.subscribe((params): any => {
      if ( ~params['city'].indexOf('coords_') ) {
        this.request['centre_point'] = params['city'].slice(7);
        delete this.request['place_name']
      } else {
        this.request['place_name'] = params['city'];
        delete this.request['centre_point'];
      }
      this.request['listing_type'] = params['listing_type'];
      this.getMyFaves();
      this.querySubscription = this.activateRoute.queryParams.subscribe(
        (queryParam: any) => {
          this.addFilterToRequest(queryParam);
          this.requestToApi();
        }
      );
    });
  }
  public onResize(event) {
    if (event.target.innerWidth < 800) {
      this.viewFilter = false;
    } else {
      this.viewFilter = true;
    }
  }
  private findElemToFaves(elem, array) {
    for ( let i = 0; i < array.length; i++ ) {
      if (array[i]['lister_url'] === elem['lister_url']) {
        return true;
      }
    }
    return false;
  }
  public addToFaves(item: any) {
    if ( !this.findElemToFaves(item, this.myFaves) ) {
      item['is_favorite'] = true;
      this.setMyFaves(item);
    }
  }
  public setMyFaves(item) {
   if (item) {
     this.myFaves.push(item);
     window.localStorage.setItem( 'myFaves',  JSON.stringify(this.myFaves) );
    }
  }
  public getMyFaves() {
    this.myFaves = JSON.parse( window.localStorage.getItem('myFaves') );
    if (this.myFaves === null || this.myFaves[0] === '') {
      this.myFaves = [];
    }
  }
  public addFilterToRequest(filter: any) {
    let defaultFilter: any = {
      sort: 'nestoria_rank',
      bathrooms: '',
      bedrooms: '',
      property_type: 'all',
      price_min: 0,
      price_max: 1000000
    };
    for ( let key in defaultFilter ) {
      if ( filter[key] ) {
        if ( 'bedrooms' in filter ) {
          let tmpArray = filter['bedrooms'].split(',');
          this.request['bedroom_min'] = Math.min.apply(null, tmpArray);
          this.request['bedroom_max'] = Math.max.apply(null, tmpArray);
          if (this.request['bedroom_max'] === 4) {
            this.request['bedroom_max'] = 50;
          }
        } else {
          delete this.request['bedroom_min'];
          delete this.request['bedroom_max'];
        }
        if ( 'bathrooms' in filter ) {
          let tmpArray = filter['bathrooms'].split(',');
          this.request['bathroom_min'] = Math.min.apply(null, tmpArray);
          this.request['bathroom_max'] = Math.max.apply(null, tmpArray);
          if (this.request['bathroom_max'] === 4) {
            this.request['bathroom_max'] = 50;
          }
        } else {
          delete this.request['bathroom_min'];
          delete this.request['bathroom_max'];
        }
        if (key !== 'bedrooms' && key !== 'bathrooms') {
          this.request[key] = filter[key];
        }
      } else {
        if (key !== 'bedrooms' && key !== 'bathrooms') {
          delete this.request[key];
        }
      }
    }
  }
  public requestToApi() {
    this.listings = [];
    this.hiddenLoader = true;
    this.httpService.getJsonpData(this.currCountry.api, this.request)
      .toPromise()
      .then((resp: any) => {
        return resp.json();
      })
      .then((resp: any) => {
        this.response = resp.response;
      })
      .then(() => {
        this.listings = this.response['listings'];
        for ( let i = 0; i < this.listings.length; i++ ) {
          this.listings[i]['place_name'] = this.request.place_name;
          if ( !this.findElemToFaves(this.listings[i], this.myFaves) ) {
            this.listings[i]['is_favorite'] = false;
          } else {
            this.listings[i]['is_favorite'] = true;
          }
        }
        this.length = this.response['total_results'];
        this.hiddenLoader = false;
      });
  }
  public toggleFilter() {
    this.viewFilter = !this.viewFilter;
  }
  public reloadListing(event) {
    this.request.page = event.pageIndex + 1;
    this.request.number_of_results = event.pageSize;
    this.requestToApi();
  }
  public openDialogWindow(item: any) {
    let config = new MdDialogConfig();
    let dialogRef = this.dialog.open(ModalDialog, config);
    dialogRef.componentInstance.item = item;
    dialogRef.componentInstance.icon = 'star';
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'clickButton') {
        this.addToFaves(item);
      }
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.querySubscription.unsubscribe();
  }
}
@Component({
  selector: 'modal-dialog',
  templateUrl: 'modal-dialog.html',
  styleUrls: ['modal-dialog.less']
})
export class ModalDialog implements OnInit {
  public icon: string;
  public item: any;
  public valueSummary: string;
  constructor(public dialogRef: MdDialogRef<ModalDialog>) {}
  ngOnInit() {
    this.valueSummary = this.item.summary;
  }
}
