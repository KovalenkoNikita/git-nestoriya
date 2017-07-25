import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RealtyPageComponent } from './realty-page/realty-page.component';
import { SearchPageComponent } from './search-page/search-page.component';

@NgModule({
  declarations: [
    AppComponent,
    RealtyPageComponent,
    SearchPageComponent,
    SearchPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
