import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { User } from '../interfaces/user';
import { VariablesGlobales } from '../models/variablesGlobales';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title: string = "Pub & Moi";

  constructor(private authenticationService: AuthenticationService,
    private usersService: UsersService,
    private router: Router,
    public params: VariablesGlobales) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (userSession) => {
        if (userSession) {

          this.params.isLoggedIn = true;
          this.usersService.getUser(userSession.uid).then(
            (user: User) => {
              if (user.admin === true) {
                this.params.isAdmin = true;
              }
              else {
                this.params.isAdmin = false;
              }
            }
          ).catch(
            (error) => {
              switch (error.code) {
                case 'auth/user-not-found': {
                  alert('Utilisateur incorrect');
                  break;
                }
                case 'auth/wrong-password': {
                  alert('Mot de passe incorrect');
                  break;
                }
                default: {
                  alert(error);
                }
              }
            }
          );


        }
        else {
          this.params.isLoggedIn = false;
          this.params.isAdmin = false;
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
