import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { HttpService } from "../http.service";
import { SearchInputComponent } from "../search-input/search-input.component";

declare var $: any;

@Component({
  selector: 'app-realty-page',
  templateUrl: './realty-page.component.html',
  styleUrls: ['./realty-page.component.less']
})
export class RealtyPageComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private querySubscription: Subscription;
  @ViewChild(SearchInputComponent) childComponent: SearchInputComponent;
  viewFilter: boolean;
  hiddenLoader: boolean = true;
  length = 80;
  pageSize = 5;
  pageSizeOptions = [5, 10, 25];

  request: any = {
    callback: 'JSONP_CALLBACK',
    encoding: 'json',
    action: 'search_listings',
    number_of_results: this.pageSize,
    page: 1,
  };
  myFaves:  any = [];
  response: any = {};
  listings: any = [];

  constructor(private httpService: HttpService,
              private activateRoute: ActivatedRoute) {
  }
  public ngOnInit() {
    if (window.innerWidth < 800) {
      this.viewFilter = false;
    } else {
      this.viewFilter = true;
    }
    this.childComponent.reload();
    this.querySubscription = this.activateRoute.queryParams.subscribe(
      (queryParam: any) => {
        this.addFilterToRequest(queryParam);
      }
    );
    this.subscription = this.activateRoute.params.subscribe((params): any => {
      if ( ~params['city'].indexOf('coords_') ) {
        this.request['centre_point'] = params['city'].slice(7);
        console.log(  this.request['centre_point']);
        delete  this.request['place_name']
      } else {
        this.request['place_name'] = params['city'];
        delete this.request['centre_point'];
      }
      this.request['listing_type'] = params['listing_type'];
      this.getMyFaves();
      this.requestToApi();
    });

    SearchInputComponent.onRouteClick.subscribe((country) => {
      this.request['place_name'] = country;
      this.requestToApi();
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
    console.log(filter);
    for(let key in filter) {
      console.log(key + ' = ' + filter[key]);
      if (key === 'bedrooms') {
        let tmpArray = filter[key].split(',');
        if (tmpArray.length === 0) {
          delete this.request['bedroom_min'];
          delete this.request['bedroom_max'];
        } else {
          this.request['bedroom_min'] = Math.min.apply(null, tmpArray);
          this.request['bedroom_max'] = Math.max.apply(null, tmpArray);
        }

      } else if (key === 'bathrooms') {
        let tmpArray = filter[key].split(',');
        if (tmpArray.length === 0) {
          delete this.request['bathroom_min']
          delete this.request['bathroom_max']
        } else {
          this.request['bathroom_min'] = Math.min.apply(null, tmpArray);
          this.request['bathroom_max'] = Math.max.apply(null, tmpArray);
        }

      } else {
        this.request[key] = filter[key];
      }
    }
  }
  public openDialogWindow(item: any) {
    console.log(item);
  }
  public requestToApi() {
    this.listings = [];
    this.hiddenLoader = true;
    this.httpService.getJsonpData(this.request)
      .toPromise()
      .then((resp: any) => {
        console.log(this.request);
        console.log(resp.json());
        return resp.json();
      })
      .then((resp: any) => {
        this.response = resp.response;
      })
      .then(() => {
        this.listings = this.response['listings'];
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
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.querySubscription.unsubscribe();
  }
}
