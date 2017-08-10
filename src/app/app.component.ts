import { Component, OnInit, AfterViewInit  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements  AfterViewInit  {


  constructor(private router: Router) {
  }
  ngAfterViewInit () {
    //document.body.className = 'loaded';
  }
  public routeToFavesPage() {
    this.router.navigate(['/faves/1']);
  }
  public routeToMap() {
    this.router.navigate(['map']);
  }
}
