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

  destinationPlaceResult: google.maps.places.PlaceResult;
  directionsForm = new FormGroup({
    originFormControl: new FormControl(''),
    locationTypeFormControl: new FormControl('')
  });
  directionsService: google.maps.DirectionsService;
  directionsRenderer: google.maps.DirectionsRenderer;
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
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(this.map);
    this.directionsRenderer.setPanel(this.directionsNode.nativeElement);
  }

  initPlaces() {
    this.originAutocomplete = new google.maps.places.Autocomplete(this.originElementRef.nativeElement);
  }

  onSubmit() {
    this.originPlaceResult = this.originAutocomplete.getPlace();
    this.calcRoute();
  }

  calcRoute() {
    const directionsOptions: google.maps.DirectionsRequest = {
      origin: { placeId: this.originPlaceResult.place_id },
      destination: { placeId: this.destinationPlaceResult.place_id },
      travelMode: google.maps.TravelMode.DRIVING
    };

    this.directionsService.route(directionsOptions, (result, status) => {
      if (status === 'OK') {
        this.directionsRenderer.setDirections(result);
      }
    });
  }
}
