import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {


  constructor(private router: Router) {
  }
  ngOnInit() {

  }
  public routeToFavesPage() {
    this.router.navigate(['/faves/1']);
  }
  public routeToMap() {
    this.router.navigate(['map']);
  }
}
