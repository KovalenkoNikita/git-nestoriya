import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Subscription} from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faves-page',
  templateUrl: './faves-page.component.html',
  styleUrls: ['./faves-page.component.less']
})
export class FavesPageComponent implements OnInit, OnDestroy {

  length = 80;
  currPage: number;
  pageSize = 5;
  pageSizeOptions = [5, 10, 25];
  listings: any = [];

  constructor(private router: Router) { }

  ngOnInit() {
    this.getMyFaves();
  }
  public setMyFaves() {
    window.localStorage.setItem( 'myFaves',  JSON.stringify(this.listings) );
  }
  public getMyFaves() {
    this.listings = JSON.parse( window.localStorage.getItem('myFaves') );
    if (this.listings === null || this.listings[0] === '') {
      this.listings = [];
    }
  }
  public routeToHome() {
    this.router.navigate(['']);
  }

  public ngOnDestroy() {
    //
  }
}
