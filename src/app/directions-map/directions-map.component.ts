import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { } from 'googlemaps';

@Component({
  selector: 'app-directions-map',
  templateUrl: './directions-map.component.html',
  styleUrls: ['./directions-map.component.scss']
})
export class DirectionsMapComponent implements OnInit {

  destinationAutocomplete: google.maps.places.Autocomplete;
  destinationPlaceResult: google.maps.places.PlaceResult;
  directionsForm = new FormGroup({
    originFormControl: new FormControl(''),
    destinationFormControl: new FormControl('')
  });
  directionsService: google.maps.DirectionsService;
  directionsRenderer: google.maps.DirectionsRenderer;
  map: google.maps.Map;
  originAutocomplete: google.maps.places.Autocomplete;
  originPlaceResult: google.maps.places.PlaceResult;

  @ViewChild('mapNode', { static: true })
  mapNode: ElementRef;

  @ViewChild('directionsNode', { static: true })
  directionsNode: ElementRef;

  @ViewChild('originNode', { static: true })
  originElementRef: ElementRef;

  @ViewChild('destinationNode', { static: true })
  destinationElementRef: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this.initMap();
    this.initDirections();
    this.initPlaces();
  }

  initMap() {
    const mapOptions = {
      center: new google.maps.LatLng(39.736, -105.139),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapNode.nativeElement, mapOptions);
  }

  initDirections() {
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(this.map);
    this.directionsRenderer.setPanel(this.directionsNode.nativeElement);
  }

  initPlaces() {
    this.originAutocomplete = new google.maps.places.Autocomplete(this.originElementRef.nativeElement);
    this.destinationAutocomplete = new google.maps.places.Autocomplete(this.destinationElementRef.nativeElement);
  }

  onSubmit() {
    this.originPlaceResult = this.originAutocomplete.getPlace();
    this.destinationPlaceResult = this.destinationAutocomplete.getPlace();
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
