import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Store} from '@ngrx/store';

import {LOGIN_API} from '../../shared/constants/api';
import {JSON_HEADERS} from '../../shared/constants/headers';
import {
  LOGIN_IN_PROGRESS, LOGIN_SUCCCESS, LOGIN_FAILURE, LOGIN_START
} from '../../shared/reducers/user-account/actions';

@Injectable()
export class LoginService {
  constructor(private http: Http, private store: Store<any>) {}

  public login(loginInfo: any): void {
    this.store.dispatch({type: LOGIN_IN_PROGRESS});
    this.http.post(LOGIN_API, JSON.stringify(loginInfo), JSON_HEADERS)
        .subscribe(
            response => this.store.dispatch({type: LOGIN_SUCCCESS, payload: response.json()}),
            err => {
              let errorBody = undefined;
              if (typeof err._body !== 'undefined') {
                errorBody = JSON.parse(err._body);
              }
              this.store.dispatch({type: LOGIN_FAILURE, payload: {error: errorBody}});
            });
  }

  loginStart() { this.store.dispatch({type: LOGIN_START}); }

  isLoggedIn(): boolean { return false; }
}
