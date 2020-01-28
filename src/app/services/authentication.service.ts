import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private loaderService: LoaderService) { }

  signInUser(email: string, password: string) {

    this.loaderService.setLoading(true);

    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          (data) => {
            console.log('Connecté');
            resolve(data);
          }
        ).catch(
          (error) => {
            reject(error);
          }
        ).finally(
          () => {
            this.loaderService.setLoading(false);
          }
        )
      }
    );
  }

  signUpUser(email: string, password: string) {

    this.loaderService.setLoading(true);

    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            console.log('Enregistré');
            resolve();
          }
        ).catch(
          (error) => {
            reject(error);
          }
        ).finally(
          () => {
            this.loaderService.setLoading(false);
          }
        )
      }
    );
  }

  signOutUser() {
    firebase.auth().signOut();
  }
}
