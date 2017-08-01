import { Routes } from '@angular/router';
import { SearchPageComponent } from './search-page/search-page.component';
import { RealtyPageComponent } from './realty-page/realty-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: SearchPageComponent
  },
  {
    path: ':sity/property/buy',
    component: RealtyPageComponent
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];
