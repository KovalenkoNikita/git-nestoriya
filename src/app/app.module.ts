import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule} from '@angular/router';
import { JsonpModule } from '@angular/http';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';

import { AppComponent } from './app.component';
import { MyOwnCustomMaterialModule } from './my-own-custom-material/my-own-custom-material.module';
import { appRoutes } from './app.routes';
import { RealtyPageComponent } from './realty-page/realty-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { FooterComponent } from './footer/footer.component';
import { FilterListComponent } from './filter-list/filter-list.component';
import { FavesPageComponent } from  './faves-page/faves-page.component';
import { GoogleMapComponent } from './google-map/google-map.component'
import { HttpService } from "./http.service";
@NgModule({
  declarations: [
    AppComponent,
    RealtyPageComponent,
    SearchPageComponent,
    SearchInputComponent,
    NotFoundPageComponent,
    FooterComponent,
    FilterListComponent,
    FavesPageComponent,
    GoogleMapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    BrowserAnimationsModule,
    MyOwnCustomMaterialModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCqKg1YqxtnvQuKspnMHOLnyxT1Ei7NwdE',
      libraries: ['places']
    })
  ],
  providers: [HttpService, GoogleMapsAPIWrapper ],
  bootstrap: [AppComponent ]
})
export class AppModule { }
