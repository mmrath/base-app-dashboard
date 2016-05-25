import { Component , OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router-deprecated';
import { CORE_DIRECTIVES, FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators } from '@angular/common';

import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import {LoginService} from './login.service';
import {PIPES} from '../../shared/pipes/index';


@Component({
  moduleId: module.id,
  selector: 'my-app-login',
  directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES ],
  templateUrl: './login.component.html',
  providers: [LoginService],
  pipes: [PIPES]
})
export class LoginComponent implements OnInit {
  auth: Observable<any>;
  loginForm: ControlGroup;

  username: Control;
  password: Control;

  constructor(private store: Store<any>, private router: Router, private loginService: LoginService, private builder: FormBuilder) {
    this.username = new Control('', Validators.compose([Validators.required]));
    this.password = new Control('', Validators.compose([Validators.required, Validators.minLength(8)]));
    this.loginForm = builder.group({
      username: this.username,
      password: this.password
    });
  }

  ngOnInit() {
    this.auth = this.store.select('auth');
    if (!this.loginService.isLoggedIn()) {
      this.loginService.loginStart();
    }
  }

  login(event) {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value);
    }
  }
}
