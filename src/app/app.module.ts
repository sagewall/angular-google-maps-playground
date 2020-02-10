import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicMapComponent } from './basic-map/basic-map.component';
import { DirectionsMapComponent } from './directions-map/directions-map.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicMapComponent,
    DirectionsMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
