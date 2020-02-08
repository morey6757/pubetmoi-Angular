import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { User } from '../interfaces/user';
import * as firebase from 'firebase';
import { VariablesGlobales } from '../models/variablesGlobales';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUser: User;

  constructor(private usersService: UsersService) { }

  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          userAuth => {
            firebase.database().ref('/users/' + userAuth.user.uid + '/user').once('value').then(
              (user) => {
                resolve(user.val());
              }
            ).catch(
              (error) => {
                reject(error);
              }
            );
          }
        ).catch(
          (error) => {
            reject(error);
          }
        )
      }
    );
  }

  signUpUser(email: string, password: string, user: User) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          userAuth => {
            user.uid = userAuth.user.uid;
            firebase.database().ref('/users/' + userAuth.user.uid).set({ user }).then(
              () => {
                resolve(user.uid);
              }
            ).catch(
              (error) => {
                reject(error);
              }
            )
          }
        ).catch(
          (error) => {
            reject(error);
          }
        )
      }
    );
  }

  signOutUser() {
    firebase.auth().signOut();
  }

}
