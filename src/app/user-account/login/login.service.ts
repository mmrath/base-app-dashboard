import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Store} from '@ngrx/store';
import {Headers} from '@angular/http';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/let';


import {LOGIN_API} from '../../shared/constants/api';
import {
  LOGIN_IN_PROGRESS, LOGIN_SUCCCESS, LOGIN_FAILURE, LOGIN_START
} from '../../shared/reducers/user-account/actions';

@Injectable()
export class LoginService {
  constructor(private http: Http, private store: Store<any>) {}


  public login(loginInfo: any): void {
    this.store.dispatch({type: LOGIN_IN_PROGRESS});
    let data = 'j_username=' + encodeURIComponent(loginInfo.username) +
      '&j_password=' + encodeURIComponent(loginInfo.password) +
      '&remember-me=false&submit=Login';

    this.http.post(LOGIN_API, data, {headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'})})
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

  isLoggedIn(): boolean {
    let loggedIn = false;
    this.store.select('auth').take(1).subscribe( auth => {
      if ( typeof auth !== 'undefined' && auth['success']) {
          loggedIn = true;
      }
    });
    return loggedIn;
  }
}
