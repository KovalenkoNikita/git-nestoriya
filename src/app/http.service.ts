import { Injectable } from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class HttpService {

  constructor(private http: Http) {}

  public getData() {
    return this.http.get('https://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy&page=1&place_name=leeds');
  }


}
