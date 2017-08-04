import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule} from '@angular/router';
import { JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MyOwnCustomMaterialModule } from './my-own-custom-material/my-own-custom-material.module';
import { appRoutes } from './app.routes';
import { RealtyPageComponent, ModalDialogComponent } from './realty-page/realty-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { FooterComponent } from './footer/footer.component';
import { FilterListComponent } from './filter-list/filter-list.component';
import { HttpService } from "./http.service";

@NgModule({
  declarations: [
    AppComponent,
    RealtyPageComponent,
    SearchPageComponent,
    NotFoundPageComponent,
    FooterComponent,
    FilterListComponent,
    ModalDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    BrowserAnimationsModule,
    MyOwnCustomMaterialModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [HttpService],
  bootstrap: [AppComponent, ModalDialogComponent ]
})
export class AppModule { }
