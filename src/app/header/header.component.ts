import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title: string = "Pub & Moi";
  isLoggedIn = false;

  constructor(private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (userSession) => {
        if (userSession) {
          this.isLoggedIn = true;
        }
        else {
          this.isLoggedIn = false;
        }
      }
    );
  }

  onSignOut() {
    this.authenticationService.signOutUser();
    this.router.navigate(['home']);
  }

  public navigate(page: string): void {
    this.router.navigate([page]);
  }

  onSign(paramSign) {
    this.router.navigate(['sign', paramSign]);
  }

}
