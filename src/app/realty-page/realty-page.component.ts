import { Component, OnInit } from '@angular/core';
import { HttpService } from "../http.service";

@Component({
  selector: 'app-realty-page',
  templateUrl: './realty-page.component.html',
  styleUrls: ['./realty-page.component.less']
})
export class RealtyPageComponent implements OnInit {

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getData()
      .subscribe((resp: any) => {
        let info = resp.json();
        console.log(info);
      });
  }

}
