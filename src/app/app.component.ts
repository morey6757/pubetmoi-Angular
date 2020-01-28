import { Component } from '@angular/core';
import { ElementSchemaRegistry } from '@angular/compiler';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyAl24fUzoVkB9BJecXvMXMoXoLTw6Uk1a4",
      authDomain: "pub-et-moi-1e1bb.firebaseapp.com",
      databaseURL: "https://pub-et-moi-1e1bb.firebaseio.com",
      projectId: "pub-et-moi-1e1bb",
      storageBucket: "pub-et-moi-1e1bb.appspot.com",
      messagingSenderId: "240592766763",
      appId: "1:240592766763:web:1e00a8fb828e64ee91e76e"
    };
    firebase.initializeApp(firebaseConfig);
  }
}
