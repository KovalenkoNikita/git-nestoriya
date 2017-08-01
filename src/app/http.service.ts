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
    this.property['pretty'] = '1';
    this.property['action'] = 'search_listings';
    this.property['encoding'] = 'json';
    this.property['listing_type'] = 'buy';
    this.property['place_name'] = 'leeds';
    this.property['number_of_results'] = '6';
    this.property['page'] = '1';
    this.property['place_name'] = 'london';
  }

  public getJsonpData() {
    return this.jsonp.request(this.apiRoot, { search: this.property })
      .map((response: any) => {
        console.log(response);
        return response.json();
      })
      .subscribe((res) => {
        console.log( res.response );
        return res;
      });
  }
  public getTest(searchText: string) {
    let test = {};
    test['callback'] = 'JSONP_CALLBACK';
    test['country'] = 'uk';
    test['encoding'] = 'json';
    test['action'] = 'keywords';
    test['place_name'] = searchText;

    return this.jsonp.request(this.apiRoot, { search: test });

  }
  public getCities() {
    return this.http.get('./assets/countriesToCities.json');


  }

}
