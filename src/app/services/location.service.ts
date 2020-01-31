import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  getLocation(): Observable<any> {
    return Observable.create(observer => {
      if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
          (position) => {
            observer.next(position);
            observer.complete();
          },
          (error) => observer.error(error)
        );
      } else {
        observer.error('Localisation impossible');
      }
    });
  }

  getWatch(): Observable<any> {
    return Observable.create(observer => {
      window.navigator.geolocation.watchPosition(
        (position) => {
          observer.next(position);
        },
        (error) => observer.error(error)
      );
    });
  }

  getSuivi(): Promise<any> {
    return new Promise((resolve, reject) => {

      navigator.geolocation.watchPosition(resp => {
        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
      },
        err => {
          reject(err);
        });
    });

  }

}
