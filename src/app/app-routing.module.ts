import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicMapComponent } from './basic-map/basic-map.component';

const routes: Routes = [
  { path: 'basic-map', component: BasicMapComponent },
  { path: '', redirectTo: '/basic-map', pathMatch: 'full' },
  { path: '**', component: BasicMapComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
