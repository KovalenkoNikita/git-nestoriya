import {Component, OnInit} from '@angular/core';
import {HttpService} from "../http.service";

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-realty-page',
  templateUrl: './realty-page.component.html',
  styleUrls: ['./realty-page.component.less']
})
export class RealtyPageComponent implements OnInit {
  viewFilter: boolean = true;
  length = 80;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25];

  listings: any = {};

  constructor(private httpService: HttpService) {
  }

  ngOnInit() {
    this.httpService.getTest('E postcode area')
      .map((response: any) => {
        console.log(response);
        return response.json();
      })
      .subscribe((res) => {
        console.log( res.response );
        return res.response;
      });
  }

  toggleFilter() {
    this.viewFilter = !this.viewFilter;
  }
}
