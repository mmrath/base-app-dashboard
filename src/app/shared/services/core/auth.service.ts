import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Store} from '@ngrx/store';
import {AuthApi} from '../../api/core';
import {AuthActions} from '../../reducers/user-account';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {LOGIN_API, LOGOUT_API} from '../../constants/api';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/let';
import {AuthState} from '../../reducers/user-account/auth.reducer';
import {getAuthState} from '../../reducers/index';

@Injectable()
export class AuthService {
  constructor(private http: Http, private authApi: AuthApi, private store: Store<any>) {}

  checkAuth(): Subscription {
    return this.authApi.checkAuth().subscribe(
        response => this.store.dispatch(AuthActions.loginSuccess(response)),
        error => this.store.dispatch(AuthActions.loginFailed(error)));
  }

  login(loginInfo: any): Subscription {
    let data = 'j_username=' + encodeURIComponent(loginInfo.username) + '&j_password=' +
        encodeURIComponent(loginInfo.password) + '&remember-me=false&submit=Login';

    return this.http
        .post(
            LOGIN_API, data,
            {headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'})})
        .subscribe(response => {
          this.store.dispatch(AuthActions.loginSuccess(response));
          this.checkAuth();
        }, err => {
          this.store.dispatch(AuthActions.loginFailed(err.text()))
        });
  }

  logout(): Subscription {
    return this.http.post(LOGOUT_API, '')
        .subscribe(
            res => {
              this.store.dispatch(AuthActions.logoutSuccess());
              this.checkAuth();
            },
            err => {
              this.checkAuth();
              this.store.dispatch(AuthActions.logoutSuccess());
            });
  }

  getAuthState(): Observable<AuthState> { return this.store.let(getAuthState()); }

  isPublicRoute(path: string): boolean {
    console.log('Path is:' + path);
    if (path === undefined || path === null) {
      return false;
    }
    return path.endsWith('/login') || path.endsWith('/signup') || path.endsWith('/reset') ||
        path.endsWith('/activate');
  }
}
