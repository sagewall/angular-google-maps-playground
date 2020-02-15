import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { } from 'googlemaps';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-closest-location-map',
  templateUrl: './closest-location-map.component.html',
  styleUrls: ['./closest-location-map.component.scss']
})
export class ClosestLocationMapComponent implements OnInit {

  closestLocation: any = {};
  destinations: google.maps.LatLng[] = [];
  destinationPlaceResult: google.maps.places.PlaceResult;
  distanceMatrixService = new google.maps.DistanceMatrixService();
  directionsForm = new FormGroup({
    originFormControl: new FormControl(''),
    locationTypeFormControl: new FormControl('')
  });
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  locationFeatureCollection: GeoJSON.FeatureCollection;
  map: google.maps.Map;
  originAutocomplete: google.maps.places.Autocomplete;
  originPlaceResult: google.maps.places.PlaceResult;

  @ViewChild('mapNode', { static: true })
  mapNode: ElementRef;

  @ViewChild('directionsNode', { static: true })
  directionsNode: ElementRef;

  @ViewChild('originNode', { static: true })
  originElementRef: ElementRef;

  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
    this.initMap();
    this.initDirections();
    this.initPlaces();
  }

  initMap() {
    const mapStyles: google.maps.MapTypeStyle[] = [{
      featureType: 'poi',
      stylers: [
        { visibility: 'off' }
      ]
    }];

    const mapOptions = {
      center: new google.maps.LatLng(39.736, -105.139),
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: mapStyles
    };

    this.map = new google.maps.Map(this.mapNode.nativeElement, mapOptions);

    this.locationFeatureCollection = this.locationService.getLocationFeatureCollection();
    this.map.data.addGeoJson(this.locationFeatureCollection);
  }

  initDirections() {
    this.directionsRenderer.setMap(this.map);
    this.directionsRenderer.setPanel(this.directionsNode.nativeElement);
  }

  initPlaces() {
    const autocompleteOptions: google.maps.places.AutocompleteOptions = { fields: ['place_id', 'formatted_address'] };
    this.originAutocomplete = new google.maps.places.Autocomplete(this.originElementRef.nativeElement, autocompleteOptions);

    for (const feature of this.locationFeatureCollection.features) {
      if (feature.geometry.type === 'Point') {
        this.destinations.push(new google.maps.LatLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0]));
      }
    }
  }

  onSubmit() {
    this.originPlaceResult = this.originAutocomplete.getPlace();
    this.calcClosestLocation();
  }

  calcClosestLocation() {
    const distanceMatrixRequest: google.maps.DistanceMatrixRequest = {
      origins: [this.originPlaceResult.formatted_address],
      destinations: this.destinations,
      travelMode: google.maps.TravelMode.DRIVING
    };
    this.distanceMatrixService.getDistanceMatrix(distanceMatrixRequest,
      (response: google.maps.DistanceMatrixResponse, status: google.maps.DistanceMatrixStatus) => {
        const results: any = [];
        if (status === 'OK') {
          const origins = response.originAddresses;
          const destinations = response.destinationAddresses;

          for (let i = 0; i < origins.length; i++) {
            const elements = response.rows[i].elements;
            for (let j = 0; j < elements.length; j++) {
              const result: any = {};
              result.origin = origins[i];
              result.destination = destinations[j];
              result.distance = elements[j].distance;
              result.duration = elements[j].duration;
              results.push(result);
            }
          }
        }
        let minDistance = 999999999999999999999999999999;
        for (const result of results) {
          const distance = result.distance.value;
          if (distance < minDistance) {
            minDistance = distance;
            this.closestLocation = result;
          }
        }
        this.calcRoute();
      });
  }

  calcRoute() {
    const directionsOptions: google.maps.DirectionsRequest = {
      origin: String(this.closestLocation.origin),
      destination: String(this.closestLocation.destination),
      travelMode: google.maps.TravelMode.DRIVING
    };

    this.directionsService.route(directionsOptions, (result, status) => {
      if (status === 'OK') {
        this.directionsRenderer.setDirections(result);
      }
    });
  }
}
