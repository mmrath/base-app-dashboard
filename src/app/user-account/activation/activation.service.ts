import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/let';

import {ActivationState,ActivationActions} from "../../shared/reducers/user-account";
import {getUserActivationState} from '../../shared/reducers';
import {AccountApi} from "../../shared/api/core/account.api";

@Injectable()
export class ActivationService {

  constructor(private accountApi:AccountApi, private store:Store<any>) {
  }

  getActivationState():Observable<ActivationState>{
    return this.store.let(getUserActivationState());
  }

  public activate(key:string) {
    if (typeof key === 'string' && key.trim().length > 0) {
      this.store.dispatch(ActivationActions.activationInProgress());
      this.accountApi.activateAccount({key:key}).subscribe(
        res => {
          this.store.dispatch(ActivationActions.activationSuccess(res))
        },
        err => {
          this.store.dispatch(ActivationActions.activationError(err.text()));
        }
      );
    }
    else {
      key = undefined;
      this.store.dispatch(ActivationActions.activationError({error: 'Activation key not available'}));
    }
  }
}
