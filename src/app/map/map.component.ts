import { Component, OnInit } from '@angular/core';

import * as L from 'leaflet';
import { icon, Marker } from 'leaflet';
import { MarkerService } from '../services/marker.service';

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
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  private map;

  constructor(private markerService: MarkerService) { }

  ngOnInit() {
    this.initMap();
    //    this.markerService.makeCapitalMarkers(this.map);
    this.markerService.makeCapitalCircleMarkers(this.map);

    navigator.geolocation.getCurrentPosition(position => {
      console.log(position);

    });

  }

  private initMap(): void {

    /*
    const map = L.map('map', {
      center: [43.3435407, 5.872256],
      zoom: 9,
      attributionControl: false
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    const myIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [25, 41],
    });
    L.marker([43.3435407, 5.872256], { icon: myIcon }).bindPopup('Coca Cola').addTo(map);
    L.marker([43.1363597, 5.9159215], { icon: myIcon }).bindPopup('Orangina').addTo(map);
*/
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

    const myIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [25, 41],
    });


    const iconRetinaUrl = 'assets/marker-icon-2x.png';
    const iconUrl = 'assets/marker-icon.png';
    const shadowUrl = 'assets/marker-shadow.png';
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
    L.Marker.prototype.options.icon = iconDefault;

    L.marker([43.3435407, 5.872256], { icon: myIcon }).bindPopup('Coca Cola').addTo(this.map);
    L.marker([43.1363597, 5.9159215], { icon: myIcon }).bindPopup('Orangina').addTo(this.map);




  }


}
