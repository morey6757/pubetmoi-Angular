import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }

  makeCapitalPopup(data: any): string {
    return "<div>Capital: " + data.properties.name + "</div><div>State: " + data.properties.state + "</div><div>Population: " + data.properties.population + "</div>";
  }

}
