import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Mission } from '../interfaces/mission';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class MissionsService {

  missions: Mission[] = [];
  missionsSubject = new Subject<Mission[]>();

  constructor() {
    this.getMissions();
  }

  emitMissions() {
    this.missionsSubject.next(this.missions);
  }

  saveMissions() {
    firebase.database().ref('/missions').set(this.missions);
  }

  getMissions() {
    firebase.database().ref('/missions').on('value',
      (data) => {
        this.missions = data.val() ? data.val() : [];
        this.emitMissions();
      });
  }

  createMission(mission: Mission) {
    this.missions.push(mission);
    this.saveMissions();
    this.emitMissions();
  }

  deleteMission(index) {
    this.missions.splice(index, 1);
    this.saveMissions();
    this.emitMissions();
  }

  updateMission(mission: Mission, index) {
    firebase.database().ref('/missions/' + index).update(mission).catch(
      (error) => {
        console.error(error);
      }
    );
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const uniqueId = Date.now().toString();
        const fileName = uniqueId + file.name;
        const upload = firebase.storage().ref().child('images/missions/' + fileName).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement...');
          },
          (error) => {
            console.error(error);
            reject(error);
          },
          () => {
            upload.snapshot.ref.getDownloadURL().then(
              (downloadUrl) => {
                resolve(downloadUrl);
              }
            );
          }
        );
      }
    );
  }

  removeFile(fileLink: string) {
    if (fileLink) {
      const storageRef = firebase.storage().refFromURL(fileLink);
      storageRef.delete().then(
        () => {
          console.log('Fichier supprimé');
        }
      ).catch(
        (error) => {
          console.error(error);
        }
      );
    }

  }

  getSingleMission(id) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/missions/' + id).once('value').then(
          (data) => {
            resolve(data.val());
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