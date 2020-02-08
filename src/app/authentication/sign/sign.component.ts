import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserOld } from 'src/app/models/userold';
import { VariablesGlobales } from 'src/app/models/variablesGlobales';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit {

  signForm: FormGroup;

  paramSign: string;

  user: User = { uid: '', name: '', admin: false };

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private params: VariablesGlobales
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => this.paramSign = params['paramSign']);
    this.initSignForm();
  }

  initSignForm() {
    this.signForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      }
    )
  }

  onSubmitSignForm() {
    if (this.paramSign == 'In') {
      const email = this.signForm.get('email').value;
      const password = this.signForm.get('password').value;
      this.authenticationService.signInUser(email, password).then(
        (user: User) => {
          this.params.isAdmin = user.admin;
          this.router.navigate(['/home']);
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
      const email = this.signForm.get('email').value;
      const password = this.signForm.get('password').value;
      this.user.admin = true;
      this.user.name = 'MoreY';
      console.log('user : ' + this.user);
      this.authenticationService.signUpUser(email, password, this.user).then(
        (uid) => {
          console.log('uid : ' + uid);
          this.params.isAdmin = false;
          this.router.navigate(['/home']);
        }
      ).catch(
        (error) => {
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

}
