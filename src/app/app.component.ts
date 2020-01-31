import { Component } from '@angular/core';
import { ElementSchemaRegistry } from '@angular/compiler';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {
    firebase.initializeApp(environment.firebaseConfig);
  }
}
