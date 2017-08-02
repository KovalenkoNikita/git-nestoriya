import {Injectable} from '@angular/core';
import { Jsonp, Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class HttpService {

  apiRoot: string = 'https://api.nestoria.co.uk/api?';
  property: any = {};
  constructor(private jsonp: Jsonp, private http: Http) {
    this.property['callback'] = 'JSONP_CALLBACK';
    this.property['country'] = 'uk';
    this.property['action'] = 'keywords';
    this.property['encoding'] = 'json';
  }

  public getJsonpData(response: any) {
    return this.jsonp.request(this.apiRoot, { search: response });
  }
  public getCities() {
    return this.http.get('./assets/countriesToCities.json');
  }

}
