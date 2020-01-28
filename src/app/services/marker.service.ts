import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { PopupService } from './popup.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  capitals: string = '/assets/data/usa-capitals-2.geojson';

  static ScaledRadius(val: number, maxVal: number): number {
    return 20 * (val / maxVal);
  }

  constructor(private http: HttpClient,
    private popupService: PopupService) {
  }
  makeCapitalMarkers(map: L.Map): void {
    this.http.get(this.capitals).subscribe((res: any) => {
      for (const c of res.features) {
        const lat = c.geometry.coordinates[0];
        const lon = c.geometry.coordinates[1];
        const marker = L.marker([lon, lat]).addTo(map);
      }
    });
  }
  makeCapitalCircleMarkers(map: L.Map): void {
    this.http.get(this.capitals).subscribe((res: any) => {



      for (const c of res.features) {
        const lat = c.geometry.coordinates[0];
        const lon = c.geometry.coordinates[1];

        const circle = L.circleMarker([lon, lat]);

        circle.bindPopup(this.popupService.makeCapitalPopup(c));

        circle.addTo(map);

      }
    });
  }
}
