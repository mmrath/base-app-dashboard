import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/let';
import {Observable} from 'rxjs/Observable';
import {authReducer, AuthState, signupReducer, SignUpState, activationReducer, ActivationState} from './user-account';

export const REDUCERS = {
  auth: authReducer,
  signUp: signupReducer,
  userActivation: activationReducer,
};

export interface AppState { auth: AuthState, userActivation: ActivationState, signUp: SignUpState }

export function getAuthState() {
  return (state: Observable<AppState>) => state.select(s => s.auth);
}

export function getUserActivationState() {
  return (state: Observable<AppState>) => state.select(s => s.userActivation);
}

export function getSignUpState() {
  return (state: Observable<AppState>) => state.select(s => s.signUp);
}
