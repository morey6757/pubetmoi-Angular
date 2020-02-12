import { Component, OnInit } from '@angular/core';
import { VariablesGlobales } from 'src/app/models/variablesGlobales';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsersService } from 'src/app/services/users.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private params: VariablesGlobales,
    private SpinnerService: NgxSpinnerService,
    private usersService: UsersService,
    private location: Location) { }

  get formulaire() { return this.registerForm.controls; }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        titre: ['', [Validators.required]],
        nom: ['', [Validators.required]],
        prenom: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        telephone: ['', [Validators.required]],
        iban: ['', [Validators.required]],
        dateNaissance: ['', [Validators.required]],
        notificationSms: []
      });
    this.registerForm.setValue({
      'titre': this.params.user.titre,
      'nom': this.params.user.nom,
      'prenom': this.params.user.prenom,
      'email': this.params.user.email,
      'telephone': this.params.user.telephone,
      'dateNaissance': this.params.user.dateNaissance,
      'notificationSms': this.params.user.notificationSMS,
      'iban': this.params.user.iban
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.SpinnerService.show();
    this.params.user.titre = this.registerForm.get('titre').value;
    this.params.user.nom = this.registerForm.get('nom').value;
    this.params.user.prenom = this.registerForm.get('prenom').value;
    this.params.user.telephone = this.registerForm.get('telephone').value;
    this.params.user.dateNaissance = this.registerForm.get('dateNaissance').value;
    this.params.user.iban = this.registerForm.get('iban').value;
    this.params.user.notificationSMS = this.registerForm.get('notificationSms').value;
    console.log('user : ' + this.params.user);
    this.usersService.updateUser(this.params.user).then(
      () => {
        this.SpinnerService.hide();
        this.location.back();
      }
    ).catch(
      (error) => {
        this.SpinnerService.hide();
        alert(error);
      }
    );

  }

}
