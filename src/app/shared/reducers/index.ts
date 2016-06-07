import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';

import {authReducer, AuthState} from './user-account/auth.reducer';
import {signupReducer} from './user-account/signup.reducer';
import {activationReducer} from './user-account/activation.reducer';

export const REDUCERS = {
  auth: authReducer,
  signup: signupReducer,
  accountActivation: activationReducer,
};

export interface AppState {
  auth: AuthState
}

export function getAuthState() {
  return (state: Observable<AppState>) => state.select(s => s.auth);
}
