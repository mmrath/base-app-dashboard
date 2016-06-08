import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router-deprecated';
import {
  CORE_DIRECTIVES, FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators
} from '@angular/common';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MdButton} from '@angular2-material/button';

import {Observable} from 'rxjs/Observable';

import {EMAIL_REGEX_PATTERN} from '../../shared/constants/index';
import {SignupService} from './signup.service';
import {PIPES} from '../../shared/pipes/index';

@Component({
  moduleId: module.id,
  selector: 'app-signup',
  directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES, MD_INPUT_DIRECTIVES, MdButton],
  templateUrl: './signup.component.html',
  providers: [SignupService],
  pipes: [PIPES],

})
export class SignupComponent implements OnInit {
  signupInfo: Observable<any>;
  signupForm: ControlGroup;
  firstName: Control;
  lastName: Control;
  login: Control;
  email: Control;
  password: Control;

  constructor(private router: Router, private signupService: SignupService,
      private builder: FormBuilder) {
    this.firstName =
        new Control('', Validators.compose([Validators.required, Validators.minLength(2)]));
    this.lastName = new Control('');
    this.email = new Control(
        '', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEX_PATTERN)]));
    this.login = this.email;
    this.password =
        new Control('', Validators.compose([Validators.required, Validators.minLength(8)]));

    this.signupForm = builder.group({
      login: this.login,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    });
  }

  ngOnInit() {
    this.signupInfo = this.signupService.getSignUpState();
    this.signupService.signupStart();
  }

  public signup() {
    if (this.signupForm.valid) {
      this.signupService.signup(this.signupForm.value);
    }
  }
}
