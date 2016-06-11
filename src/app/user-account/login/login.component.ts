import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import {
  CORE_DIRECTIVES, FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators
} from '@angular/common';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MdButton} from '@angular2-material/button';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {PIPES} from '../../shared/pipes/index';
import {AuthService} from '../../shared/services/core/auth.service';
import {AuthState} from '../../shared/reducers/user-account/auth.reducer';


@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [AuthService],
  pipes: [PIPES],
  directives: [ROUTER_DIRECTIVES,  CORE_DIRECTIVES, FORM_DIRECTIVES, MD_INPUT_DIRECTIVES, MdButton]
})
export class LoginComponent implements OnInit,
    OnDestroy {
  auth: Observable<AuthState>;
  authSubscription: Subscription;
  loginForm: ControlGroup;

  username: Control;
  password: Control;

  constructor(
      private authService: AuthService, private router: Router, private builder: FormBuilder) {
    this.username =
        new Control('', Validators.compose([Validators.required, Validators.minLength(4)]));
    this.password = new Control('', Validators.compose([Validators.required]));
    this.loginForm = builder.group({username: this.username, password: this.password});
  }

  ngOnInit() {
    this.auth = this.authService.getAuthState();
    this.authSubscription = this.auth.subscribe(authState => {
      if (authState.authenticated) {
        this.router.navigate(['/home']);
      }
    });
  }

  ngOnDestroy() { this.authSubscription.unsubscribe(); }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value);
    }
  }
}
