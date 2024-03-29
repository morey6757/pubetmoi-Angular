import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { VariablesGlobales } from 'src/app/models/variablesGlobales';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit {

  signForm: FormGroup;
  user: User;
  paramSign: string;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private params: VariablesGlobales,
    private SpinnerService: NgxSpinnerService
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
      this.SpinnerService.show();
      const email = this.signForm.get('email').value;
      const password = this.signForm.get('password').value;
      this.authenticationService.signInUser(email, password).then(
        (user: User) => {
          this.SpinnerService.hide();
          this.params.user = user;
          this.router.navigate(['/home']);
        }
      ).catch(
        (error) => {
          this.SpinnerService.hide();
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
  }

}
