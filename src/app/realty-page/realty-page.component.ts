import { Component, OnInit } from '@angular/core';
import { HttpService } from "../http.service";

@Component({
  selector: 'app-realty-page',
  templateUrl: './realty-page.component.html',
  styleUrls: ['./realty-page.component.less']
})
export class RealtyPageComponent implements OnInit {
  viewFilter: boolean = true;
  length = 100;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

  listings: any = {};
  constructor(private httpService: HttpService) { }

  ngOnInit() {
    let res = this.httpService.getJsonpData();
    console.log(res);
  }
  toggleFilter() {
    this.viewFilter = !this.viewFilter;
  }
}
