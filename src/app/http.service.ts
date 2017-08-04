import {Injectable} from '@angular/core';
import { Jsonp, Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class HttpService {

  apiRoot: string = 'https://api.nestoria.co.uk/api';
  constructor(private jsonp: Jsonp, private http: Http) {
  }

  public getJsonpData(response: any) {
    return this.jsonp.request(this.apiRoot, { search: response });
  }
  public getCities() {
    return this.http.get('./assets/countriesToCities.json');
  }

}
