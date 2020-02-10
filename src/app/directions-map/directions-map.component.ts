import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { } from 'googlemaps';

@Component({
  selector: 'app-directions-map',
  templateUrl: './directions-map.component.html',
  styleUrls: ['./directions-map.component.scss']
})
export class DirectionsMapComponent implements OnInit {

  map: google.maps.Map;

  @ViewChild('mapNode', { static: true })
  mapNode: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this.initMap();
  }

  initMap() {
    const mapOptions = {
      center: new google.maps.LatLng(39.736, -105.139),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapNode.nativeElement, mapOptions);
  }
}
