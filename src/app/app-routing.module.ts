import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicMapComponent } from './basic-map/basic-map.component';
import { ClosestLocationMapComponent } from './closest-location-map/closest-location-map.component';
import { DirectionsMapComponent } from './directions-map/directions-map.component';

const routes: Routes = [
  { path: 'basic-map', component: BasicMapComponent },
  { path: 'closest-location-map', component: ClosestLocationMapComponent },
  { path: 'directions-map', component: DirectionsMapComponent },
  { path: '', redirectTo: '/closest-location-map', pathMatch: 'full' },
  { path: '**', component: ClosestLocationMapComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
