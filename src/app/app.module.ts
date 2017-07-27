import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule} from '@angular/router';
import {JsonpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { MyOwnCustomMaterialModule } from './my-own-custom-material/my-own-custom-material.module';
import { appRoutes } from './app.routes';
import { RealtyPageComponent } from './realty-page/realty-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

@NgModule({
  declarations: [
    AppComponent,
    RealtyPageComponent,
    SearchPageComponent,
    NotFoundPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    BrowserAnimationsModule,
    MyOwnCustomMaterialModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
