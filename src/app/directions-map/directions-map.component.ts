import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { } from 'googlemaps';

@Component({
  selector: 'app-directions-map',
  templateUrl: './directions-map.component.html',
  styleUrls: ['./directions-map.component.scss']
})
export class DirectionsMapComponent implements OnInit {

  directionsService: google.maps.DirectionsService;
  directionsRenderer: google.maps.DirectionsRenderer;
  map: google.maps.Map;

  @ViewChild('mapNode', { static: true })
  mapNode: ElementRef;

  @ViewChild('directionsNode', { static: true })
  directionsNode: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this.initMap();
  }

  initMap() {
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();

    const mapOptions = {
      center: new google.maps.LatLng(39.736, -105.139),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapNode.nativeElement, mapOptions);
    this.directionsRenderer.setMap(this.map);
    this.directionsRenderer.setPanel(this.directionsNode.nativeElement);

    this.calcRoute();
  }

  calcRoute() {
    const directionsOptions: google.maps.DirectionsRequest = {
      origin: '12553 W 12th Pl, Golden, Colorado, 80401',
      destination: '3500 Illinois St, Golden, Colorado, 80401',
      travelMode: google.maps.TravelMode.DRIVING
    };

    this.directionsService.route(directionsOptions, (result, status) => {
      if (status === 'OK') {
        this.directionsRenderer.setDirections(result);
      }
    });
  }
}
