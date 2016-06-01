import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, RouterLink} from '@angular/router-deprecated';
import {
  CORE_DIRECTIVES, FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators
} from '@angular/common';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MdButton} from '@angular2-material/button';

import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

import {LoginService} from './login.service';
import {PIPES} from '../../shared/pipes/index';


@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [LoginService],
  pipes: [PIPES],
  directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES, MD_INPUT_DIRECTIVES, MdButton]
})
export class LoginComponent implements OnInit, OnDestroy {
  auth: Observable<any>;
  authSubscription: Subscription;
  loginForm: ControlGroup;

  username: Control;
  password: Control;

  constructor(
      private store: Store<any>, private router: Router, private loginService: LoginService,
      private builder: FormBuilder) {
    this.username =
        new Control('', Validators.compose([Validators.required, Validators.minLength(4)]));
    this.password = new Control('', Validators.compose([Validators.required]));
    this.loginForm = builder.group({username: this.username, password: this.password});
  }

  ngOnInit() {
    this.auth = this.store.select('auth');
    this.authSubscription = this.auth.subscribe(() => {
      if (this.loginService.isLoggedIn()) {
        this.router.navigate(['/Home']);
      }
    });
    if (!this.loginService.isLoggedIn()) {
      this.loginService.loginStart();
    }
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  login(event) {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value);
    }
  }
}
