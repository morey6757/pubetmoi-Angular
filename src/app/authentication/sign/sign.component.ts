import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit {

  signForm: FormGroup;

  paramSign: string;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
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
        (data) => {
          console.log(data);
          this.router.navigate(['/admin', 'dashboard']);
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
      this.authenticationService.signUpUser(email, password).then(
        (data) => {
          console.log(data);
          this.router.navigate(['/admin', 'dashboard']);
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
