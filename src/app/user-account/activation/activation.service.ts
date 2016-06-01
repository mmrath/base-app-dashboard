import {Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import {Store} from '@ngrx/store';

import {ACCOUNT_ACTIVATE_API} from '../../shared/constants/api';
import {JSON_HEADERS} from '../../shared/constants/headers';
import {
  USER_ACTIVATION_START, USER_ACTIVATION_SUCCESS, USER_ACTIVATION_ERROR
} from '../../shared/reducers/user-account/actions';

@Injectable()
export class ActivationService {

  constructor(private http:Http, private store:Store<any>) {
  }

  public startActivation(key:string) {
    if (typeof key === 'string' && key.trim().length > 0) {
      this.store.dispatch({type: USER_ACTIVATION_START});
    }
    else {
      key = undefined;
      this.store.dispatch({type: USER_ACTIVATION_ERROR, payload: {error: 'Activation key not available'}});
    }
  }

  public activate(key:string):void {
    if (typeof key !== 'string' || key.trim().length === 0) {
      this.store.dispatch({type: USER_ACTIVATION_ERROR, payload: {error: 'Activation key not available'}});
    } else {
      let params = new URLSearchParams();
      params.set('key', key);
      this.http.get(ACCOUNT_ACTIVATE_API, Object.assign({search: params}, JSON_HEADERS))
        .subscribe(
          response => this.store.dispatch({type: USER_ACTIVATION_SUCCESS}),
          err => {
            let errorBody = undefined;
            if (typeof err._body === 'string' && err._body.length > 0) {
              errorBody = JSON.parse(err._body);
            }
            this.store.dispatch({type: USER_ACTIVATION_ERROR, payload: {error: errorBody}});
          });
    }
  }
}
