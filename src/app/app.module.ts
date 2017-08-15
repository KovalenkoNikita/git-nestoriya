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
import { RealtyPageComponent, ModalDialog } from './realty-page/realty-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { FooterComponent } from './footer/footer.component';
import { FilterListComponent } from './filter-list/filter-list.component';
import { FavesPageComponent } from  './faves-page/faves-page.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { IonRangeSliderModule } from "ng2-ion-range-slider";
import { HttpService } from "./http.service";
import { DataService } from "./data.service";
import { TRANSLATION_PROVIDERS } from './translate/translation';
import { TranslatePipe } from './translate/translate.pipe';
import { TranslateService } from './translate/translate.service';

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
    GoogleMapComponent,
    ModalDialog,
    TranslatePipe,
  ],
  entryComponents: [ ModalDialog ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    BrowserAnimationsModule,
    MyOwnCustomMaterialModule,
    IonRangeSliderModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCqKg1YqxtnvQuKspnMHOLnyxT1Ei7NwdE',
      libraries: ['places']
    })
  ],
  providers: [ HttpService, DataService, GoogleMapsAPIWrapper, TRANSLATION_PROVIDERS, TranslateService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
