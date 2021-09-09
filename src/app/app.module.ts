import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { ApiModule } from './api/api.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { GridPageComponent } from './pages/grid-page/grid-page.component';
import { ChartPageComponent } from './pages/chart-page/chart-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    GridPageComponent,
    ChartPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ApiModule.forRoot({ rootUrl: 'https://api.wiktortr.pl' }),
    AgGridModule.withComponents([]),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
