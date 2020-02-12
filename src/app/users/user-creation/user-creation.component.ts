import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { VariablesGlobales } from 'src/app/models/variablesGlobales';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.css']
})
export class UserCreationComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  user: User = { uid: '', email: '', isAdmin: false, titre: '', nom: '', prenom: '', dateNaissance: new Date(), telephone: '', notificationSMS: false, iban: '' };

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private params: VariablesGlobales,
    private SpinnerService: NgxSpinnerService) { }

  get formulaire() { return this.registerForm.controls; }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        titre: ['', [Validators.required]],
        nom: ['', [Validators.required]],
        prenom: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        telephone: ['', [Validators.required]],
        iban: ['', [Validators.required]],
        dateNaissance: ['', [Validators.required]],
        notificationSms: []
      });
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.SpinnerService.show();
    const password = this.registerForm.get('password').value;
    this.user.titre = this.registerForm.get('titre').value;
    this.user.nom = this.registerForm.get('nom').value;
    this.user.prenom = this.registerForm.get('prenom').value;
    this.user.email = this.registerForm.get('email').value;
    this.user.telephone = this.registerForm.get('telephone').value;
    this.user.dateNaissance = this.registerForm.get('dateNaissance').value;
    this.user.notificationSMS = this.registerForm.get('notificationSms').value;
    this.user.iban = this.registerForm.get('iban').value;
    this.user.isAdmin = false;
    console.log('user : ' + this.user);
    this.authenticationService.signUpUser(this.user.email, password, this.user).then(
      (uid) => {
        this.SpinnerService.hide();
        console.log('uid : ' + uid);
        this.params.user = this.user;
        this.router.navigate(['/home']);
      }
    ).catch(
      (error) => {
        this.SpinnerService.hide();
        switch (error.code) {
          case 'auth/email-already-in-use': {
            alert('Utilisateur déjà présent');
            break;
          }
          default: {
            alert(error);
          }
        }
      }
    );
  }

}
