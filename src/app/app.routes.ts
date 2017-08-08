import { Routes } from '@angular/router';
import { SearchPageComponent } from './search-page/search-page.component';
import { RealtyPageComponent } from './realty-page/realty-page.component';
import { FavesPageComponent } from './faves-page/faves-page.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: SearchPageComponent
  },
  {
    path: 'map',
    component: GoogleMapComponent
  },
  {
    path: 'faves/:id',
    component: FavesPageComponent
  },
  {
    path: 'coord_:coord/property/buy',
    component: RealtyPageComponent
  },
  {
    path: ':city/property/buy',
    component: RealtyPageComponent
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];
