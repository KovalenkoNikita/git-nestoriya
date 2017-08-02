import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {HttpService} from "../http.service";

@Component({
  selector: 'app-realty-page',
  templateUrl: './realty-page.component.html',
  styleUrls: ['./realty-page.component.less']
})
export class RealtyPageComponent implements OnInit {
  private subscription: Subscription;

  viewFilter: boolean = true;
  length = 80;
  pageSize = 5;
  pageSizeOptions = [5, 10, 25];

  request: any = {
    callback: 'JSONP_CALLBACK',
    country: 'uk',
    encoding: 'json',
    action: 'search_listings',
    number_of_results: this.pageSize,
    page: 1,
   };

  response: any = {};
  listings: any = [];

  constructor(private httpService: HttpService,
              private activateRoute: ActivatedRoute) {
  }

  public ngOnInit() {
    this.subscription = this.activateRoute.params.subscribe((params): any => {
      this.request['place_name'] = params['city'];
    });
    this.requestToApi();
  }

  requestToApi() {
    this.httpService.getJsonpData(this.request)
      .toPromise()
      .then((resp: any) => {
        console.log(resp.json());
        return resp.json();
      })
      .then((resp: any) => {
        this.response = resp.response;
      })
      .then(() => {
        this.listings = this.response['listings'];
        this.length = this.response['total_results'];
        console.log(this.listings);
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
}
