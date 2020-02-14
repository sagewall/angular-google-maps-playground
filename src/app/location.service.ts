import { Injectable } from '@angular/core';
import { LOCATIONS } from './locations';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  getLocationFeatureCollection(): GeoJSON.FeatureCollection {
    return LOCATIONS;
  }
}
