import { Component, OnInit, Input, OnDestroy, ElementRef, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { LocationService } from '../services/location.service';
import { Mission } from '../interfaces/mission';
import { Subscription } from 'rxjs';
import { MissionsService } from '../services/missions.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

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
  popupAnchor: [0, -75]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {

  flyerIcon = L.icon({
    iconUrl: './assets/icones/icons8-boîte-aux-lettres-fermée-vide-24.png',
    iconSize: [24, 24],
    iconAnchor: [24, 24],
    popupAnchor: [0, -20]
  });
  casquetteIcon = L.icon({
    iconUrl: './assets/icones/icons8-casquette-de-baseball-24.png',
    iconSize: [24, 24],
    iconAnchor: [24, 24],
    popupAnchor: [0, -20]
  });
  shirtIcon = L.icon({
    iconUrl: './assets/icones/icons8-t-shirt-24.png',
    iconSize: [24, 24],
    iconAnchor: [24, 24],
    popupAnchor: [0, -20]
  });
  voitureIcon = L.icon({
    iconUrl: './assets/icones/icons8-voiture-24.png',
    iconSize: [24, 24],
    iconAnchor: [24, 24],
    popupAnchor: [0, -20]
  });

  missions: Mission[] = [];
  missionsSubscription: Subscription;

  private map;

  subscription: any;

  constructor(
    private locationService: LocationService,
    private missionsService: MissionsService,
    private router: Router,
    private elementRef: ElementRef,
  ) { }

  ngOnInit() {
    this.initMap();
    this.missionsSubscription = this.missionsService.missionsSubject.subscribe(
      (missions: Mission[]) => {
        this.missions = missions;
        this.missions.forEach(
          (mission, index) => {
            let html: string = `
            <div align='center'>
            <a class="btn btn-primary button-raised partner-link">coucou</a>
              <p style='font-size:14px;margin: 5px'>hello world</p>
              <img style="height: 100px; width: 170px; margin: 0" src="./assets/icones/icons8-t-shirt-24.png">
              <p style="margin:5px;font-style:italic">youpi</p>
              <a class="merch-link" data-merchId="`+ index + `">Détails de la mission</a>
            </div>
          <center>"` + mission.titre + `"<br>pour l'enseigne "` + mission.enseigne + `"<br><button mat-raised-button color='primary'>détails</button></center>`;
            let mark: any[] = [];
            switch (mission.type) {
              case 'Vestimentaire':
                mark[index] = L.marker([mission.lat, mission.lng], { icon: this.shirtIcon }).bindPopup(html).addTo(this.map);
                let self = this;
                break;
              case 'Marquage Automobile':
                mark[index] = L.marker([mission.lat, mission.lng], { icon: this.voitureIcon }).bindPopup(html).addTo(this.map);
                break;
              case 'Distribution Flyer':
                mark[index] = L.marker([mission.lat, mission.lng], { icon: this.flyerIcon }).bindPopup(html).addTo(this.map);
                break;
              case 'Street Marketing':
                mark[index] = L.marker([mission.lat, mission.lng], { icon: this.casquetteIcon }).bindPopup(html).addTo(this.map);
                break;
            }
            let self = this;
            mark[index].on('popupopen', function () {
              // add event listener to newly added a.merch-link element
              self.elementRef.nativeElement.querySelector(".merch-link")
                .addEventListener('click', (e) => {
                  // get id from attribute
                  var merchId = e.target.getAttribute("data-merchId");
                  self.goToMission(merchId)
                });
            });


          }
        );
      }
    )

    this.missionsService.emitMissions();
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

    this.locationService.getLocation().subscribe(position => {
      //L.marker([position.coords.latitude, position.coords.longitude], { icon: myIcon }).bindTooltip('Je suis ici :-)').addTo(this.map);

      var marker = L.marker([position.coords.latitude, position.coords.longitude], { icon: myIcon }).bindPopup(`
      <div align='center'>
      <a class="btn btn-primary button-raised partner-link">coucou</a>
        <p style='font-size:14px;margin: 5px'>hello world</p>
        <img style="height: 100px; width: 170px; margin: 0" src="./assets/icones/icons8-t-shirt-24.png">
        <p style="margin:5px;font-style:italic">youpi</p>
        <a class="merch-link" data-merchId="0">Détails de la mission</a>
      </div>
    `).addTo(this.map);

      this.map.setView(new L.LatLng(position.coords.latitude, position.coords.longitude), 7);




    });




  }

  ngOnDestroy() {
    this.missionsSubscription.unsubscribe();
  }

  goToMission(id) {
    //this.navCtrl.push(MerchantPage, { merchantId: merchantId });
    console.log("going to mission " + id)
    this.router.navigate(['/mission', id]);
  }

}

/*



*/