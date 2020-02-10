import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicMapComponent } from './basic-map/basic-map.component';
import { DirectionsMapComponent } from './directions-map/directions-map.component';

const routes: Routes = [
  { path: 'basic-map', component: BasicMapComponent },
  { path: 'directions-map', component: DirectionsMapComponent },
  { path: '', redirectTo: '/basic-map', pathMatch: 'full' },
  { path: '**', component: BasicMapComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
