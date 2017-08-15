import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Subscription} from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { ModalDialog } from '../realty-page/realty-page.component';
@Component({
  selector: 'app-faves-page',
  templateUrl: './faves-page.component.html',
  styleUrls: ['./faves-page.component.less']
})
export class FavesPageComponent implements OnInit, OnDestroy {

  private length = 80;
  private currPage: number = 0;
  private pageSize = 5;
  private pageSizeOptions = [5, 10, 25];
  private myFaves:  any = [];
  private listings: any = [];
  private subscription: Subscription;
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private dialog: MdDialog) { }

  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe((params: any) => {
      this.currPage = params['idPage'] - 1;
      this.getMyFaves();
      this.length = this.myFaves.length;
      this.reloadListing();
    });
  }
  public setMyFaves() {
    window.localStorage.setItem( 'myFaves',  JSON.stringify(this.myFaves) );
  }
  public getMyFaves() {
    this.myFaves = JSON.parse( window.localStorage.getItem('myFaves') );
    if (this.myFaves === null || this.myFaves[0] === '') {
      this.myFaves = [];
    }
  }
  public openDialogWindow(item: any) {
    let config = new MdDialogConfig();
    let dialogRef = this.dialog.open(ModalDialog, config);
    dialogRef.componentInstance.item = item;
    dialogRef.componentInstance.icon = 'delete';
    let result = dialogRef.afterClosed().subscribe(result => {
      if (result === 'clickButton') {
        this.deleteElem(item);
      } else if (result !== 'buy') {
        item.summary = result;
        this.setMyFaves();
      }
    });
  }
  public deleteElem(item: any) {
    let index = this.myFaves.indexOf(item);
    this.myFaves.splice(index, 1);
    this.setMyFaves();
    this.reloadListing();
  }
  public routeToHome() {
    this.router.navigate(['']);
  }
  public refreshPageSettings(event) {
    this.currPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.router.navigate(['faves/' + (this.currPage + 1)]);
    //this.reloadListing();
  }
  public reloadListing() {
    let start = this.currPage * this.pageSize;
    let end = start + this.pageSize;
    this.listings = this.myFaves.slice(start, end);
    this.length = this.myFaves.length;
  }
  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
