import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicMapComponent } from './basic-map/basic-map.component';
import { ClosestLocationMapComponent } from './closest-location-map/closest-location-map.component';
import { DirectionsMapComponent } from './directions-map/directions-map.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicMapComponent,
    DirectionsMapComponent,
    ClosestLocationMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
