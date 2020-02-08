import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../interfaces/user';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  getUser(uid) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/users/' + uid + '/user').once('value').then(
          (user) => {
            resolve(user.val());
          }
        ).catch(
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

}