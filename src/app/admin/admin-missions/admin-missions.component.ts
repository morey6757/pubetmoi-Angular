import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MissionsService } from 'src/app/services/missions.service';
import { Subscription } from 'rxjs';
import * as $ from 'jquery';
import { Mission } from 'src/app/interfaces/mission';

@Component({
  selector: 'app-admin-missions',
  templateUrl: './admin-missions.component.html',
  styleUrls: ['./admin-missions.component.css']
})
export class AdminMissionsComponent implements OnInit, OnDestroy {

  missionsForm: FormGroup;
  missions: Mission[] = [];
  missionsSubscription: Subscription;

  indexToRemove;

  indexToUpdate;
  editMode = false;

  photoUploading = false;
  photoUploaded = false;
  photosAdded: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private missionsService: MissionsService
  ) { }

  ngOnInit() {
    this.initMissionsForm();
    this.missionsSubscription = this.missionsService.missionsSubject.subscribe(
      (missions: Mission[]) => {
        this.missions = missions;
      }
    )
    this.missionsService.getMissions();
    this.missionsService.emitMissions();
  }

  initMissionsForm() {
    this.missionsForm = this.formBuilder.group({
      titre: ['', Validators.required],
      enseigne: ['', Validators.required],
      type: ['', Validators.required],
      lat: ['', Validators.required],
      lng: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      gainPhoto: ['', Validators.required],
      gainMax: ['', Validators.required],
      details: '',
      pointsBonus: ''
    });
  }

  onSubmitMissionsForm() {
    const newMission: Mission = this.missionsForm.value;
    newMission.pointsBonus = this.missionsForm.get('pointsBonus').value ? this.missionsForm.get('pointsBonus').value : false;
    newMission.photos = this.photosAdded ? this.photosAdded : [];
    if (this.editMode) {
      this.missionsService.updateMission(newMission, this.indexToUpdate);
    }
    else {
      this.missionsService.createMission(newMission);
    }
    $('#missionFormModal').modal('hide');
  }

  resetForm() {
    this.editMode = false;
    this.missionsForm.reset();
    this.photosAdded = [];
  }

  onDeleteMission(index) {
    $('#deleteMissionModal').modal('show');
    this.indexToRemove = index;
  }

  onConfirmDeleteMission() {
    this.missions[this.indexToRemove].photos.forEach(
      (photo) => {
        this.missionsService.removeFile(photo);
      }
    );
    this.missionsService.deleteMission(this.indexToRemove);
    $('#deleteMissionModal').modal('hide');
  }

  onEditMission(mission: Mission) {
    this.editMode = true;
    $('#missionFormModal').modal('show');
    this.missionsForm.get('titre').setValue(mission.titre);
    this.missionsForm.get('enseigne').setValue(mission.enseigne);
    this.missionsForm.get('type').setValue(mission.type);
    this.missionsForm.get('lat').setValue(mission.lat);
    this.missionsForm.get('lng').setValue(mission.lng);
    this.missionsForm.get('dateDebut').setValue(mission.dateDebut);
    this.missionsForm.get('dateFin').setValue(mission.dateFin);
    this.missionsForm.get('gainPhoto').setValue(mission.gainPhoto);
    this.missionsForm.get('gainMax').setValue(mission.gainMax);
    this.missionsForm.get('details').setValue(mission.details ? mission.details : '');
    this.missionsForm.get('pointsBonus').setValue(mission.pointsBonus);
    this.photosAdded = mission.photos ? mission.photos : [];
    const index = this.missions.findIndex(
      (missionEl) => {
        if (missionEl === mission) {
          return true;
        }
      }
    );
    this.indexToUpdate = index;
  }

  onUploadFile(event) {
    this.photoUploading = true;
    this.missionsService.uploadFile(event.target.files[0]).then(
      (url: string) => {
        this.photosAdded.push(url);
        this.photoUploading = false;
        this.photoUploaded = true;
        setTimeout(() => {
          this.photoUploaded = false;
        }, 5000);
      }
    );
  }

  onRemoveAddedPhoto(index) {
    this.missionsService.removeFile(this.photosAdded[index]);
    this.photosAdded.splice(index, 1);
  }

  ngOnDestroy() {
    this.missionsSubscription.unsubscribe();
  }

}