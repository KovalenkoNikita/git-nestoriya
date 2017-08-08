import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import { MapsAPILoader, LatLng } from '@agm/core';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.less']
})
export class GoogleMapComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public radius: number = 2000;
  public heightMap: any;

  @ViewChild("search")
  public searchElementRef: ElementRef;


  constructor(private router: Router,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone) {
  }

  ngOnInit() {
    this.heightMap = window.innerHeight - 100 + 'px';
    console.log(this.heightMap);
    this.searchControl = new FormControl();
    this.setCurrentPosition();

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 11;
        });
      });
    });
  }
  func(event: any) {
    /* lat:51.511446425131
     lng:-0.10418181660156733*/
    console.log(event);
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
  }
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords);
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 11;
      });
    }
  }
  public radiusChange(event: any) {
    this.radius = event;
  }
  public routeToHome() {
    this.router.navigate(['']);
  }
}
