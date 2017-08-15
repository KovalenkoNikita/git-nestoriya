import { Injectable } from '@angular/core';
import { Jsonp, Http } from '@angular/http';

@Injectable()
export class HttpService {
  constructor(private jsonp: Jsonp, private http: Http) {
  }

  public getJsonpData(api: string, response: any) {
    return this.jsonp.request(api + '/api', { search: response });
  }
  public getCities() {
    return this.http.get('./assets/countriesToCities.json');
  }

}
