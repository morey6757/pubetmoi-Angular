import { Component, OnInit } from '@angular/core';

import * as L from 'leaflet';
import { icon, Marker } from 'leaflet';
import { MarkerService } from '../services/marker.service';
import { Coordonnees } from '../interfaces/coordonnees';
import { LocationService } from '../services/location.service';

const iconRetinaUrl = 'assets/images/marker-icon-2x.png';
const iconUrl = 'assets/images/marker-icon.png';
const shadowUrl = 'assets/images/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
const myIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [25, 41],
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  private map;

  here: Coordonnees;
  subscription: any;

  constructor(private markerService: MarkerService,
    private locationService: LocationService) { }

  ngOnInit() {
    this.initMap();
    this.markerService.makeCapitalCircleMarkers(this.map);
  }

  ngAfterViewChecked() {

  }

  private initMap(): void {

    this.map = L.map('map', {
      center: [43.3435407, 5.872256],
      zoom: 9,
      attributionControl: false
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);





    L.Marker.prototype.options.icon = iconDefault;

    L.marker([43.1363557, 5.8983259], { icon: myIcon }).bindPopup('Toulon').addTo(this.map);
    L.marker([43.2803691, 5.3102854], { icon: myIcon }).bindPopup('Marseille').addTo(this.map);

    this.locationService.getLocation().subscribe(position => {
      L.marker([position.coords.latitude, position.coords.longitude], { icon: myIcon }).bindPopup('Je suis ici :-)').addTo(this.map);
      this.map.setView(new L.LatLng(position.coords.latitude, position.coords.longitude), 12);
    });

  }

}