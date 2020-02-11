import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MissionsService } from 'src/app/services/missions.service';
import { Mission } from 'src/app/interfaces/mission';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.css']
})
export class CreationComponent implements OnInit {

  isHome: boolean = false;

  missionsForm: FormGroup;
  missions: Mission[] = [];

  photoUploading = false;
  photoUploaded = false;
  photosAdded: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private missionsService: MissionsService,
    private router: Router,
    private SpinnerService: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.initMissionsForm();
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
      details: ['', Validators.required],
      pointsBonus: ''
    });
  }

  onSubmitMissionsForm() {
    const newMission: Mission = this.missionsForm.value;
    newMission.photos = this.photosAdded ? this.photosAdded : [];
    this.missionsService.createMission(newMission);
    this.onReturn();
  }

  onUploadFile(event) {
    this.SpinnerService.show();
    this.photoUploading = true;
    this.missionsService.uploadFile(event.target.files[0]).then(
      (url: string) => {
        this.photosAdded.push(url);
        this.photoUploading = false;
        this.photoUploaded = true;
        setTimeout(() => {
          this.photoUploaded = false;
        }, 5000);
        this.SpinnerService.hide();
      }
    );
  }

  onRemoveAddedPhoto(index) {
    this.missionsService.removeFile(this.photosAdded[index]);
    this.photosAdded.splice(index, 1);
  }

  recupCoord(coordonnees) {
    this.missionsForm.controls['lat'].setValue(coordonnees[0]);
    this.missionsForm.controls['lng'].setValue(coordonnees[1]);
  }

  onReturn() {
    this.router.navigate(['admin/dashboard']);
  }

}
