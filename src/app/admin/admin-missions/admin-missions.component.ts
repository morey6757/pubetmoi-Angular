import { Component, OnInit } from '@angular/core';
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
export class AdminMissionsComponent implements OnInit {

  missionsForm: FormGroup;
  missionsSubscription: Subscription;
  missions: Mission[] = [];

  indexToRemove;

  indexToUpdate;
  editMode = false;

  photoUploading = false;
  photoUploaded = false;
  photoUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private missionsService: MissionsService
  ) { }

  ngOnInit() {
    this.initMissionsForm();
    this.missionsService.missionsSubject.subscribe(
      (data: Mission[]) => {
        this.missions = data;
      }
    );
    this.missionsService.getMissions();
    this.missionsService.emitMissions();
  }

  initMissionsForm() {
    this.missionsForm = this.formBuilder.group({
      titre: ['', Validators.required],
      enseigne: ['', Validators.required],
      type: ['', Validators.required],
      emplacement: ['', Validators.required],
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
    newMission.photo = this.photoUrl ? this.photoUrl : '';
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
    this.photoUrl = '';
  }

  onDeleteMission(index) {
    $('#deleteMissionModal').modal('show');
    this.indexToRemove = index;
  }

  onConfirmDeleteMission() {
    if (this.missions[this.indexToRemove].photo && this.missions[this.indexToRemove].photo !== '') {
      this.missionsService.removeFile(this.missions[this.indexToRemove].photo);
    }
    this.missionsService.deleteMission(this.indexToRemove);
    $('#deleteMissionModal').modal('hide');
  }

  onEditMission(mission: Mission) {
    this.editMode = true;
    $('#missionFormModal').modal('show');
    this.missionsForm.get('titre').setValue(mission.titre);
    this.missionsForm.get('enseigne').setValue(mission.enseigne);
    this.missionsForm.get('type').setValue(mission.type);
    this.missionsForm.get('emplacement').setValue(mission.emplacement);
    this.missionsForm.get('dateDebut').setValue(mission.dateDebut);
    this.missionsForm.get('dateFin').setValue(mission.dateFin);
    this.missionsForm.get('gainPhoto').setValue(mission.gainPhoto);
    this.missionsForm.get('gainMax').setValue(mission.gainMax);
    this.missionsForm.get('details').setValue(mission.details);
    this.missionsForm.get('pointsBonus').setValue(mission.pointsBonus);
    this.photoUrl = mission.photo ? mission.photo : '';
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
        if (this.photoUrl && this.photoUrl !== '') {
          this.missionsService.removeFile(this.photoUrl);
        }
        this.photoUrl = url;
        this.photoUploading = false;
        this.photoUploaded = true;
        setTimeout(() => {
          this.photoUploaded = false;
        }, 5000);
      }
    );
  }

}