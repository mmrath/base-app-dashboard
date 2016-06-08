import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/let';
import {SignUpActions, SignUpState} from '../../shared/reducers/user-account';
import {getSignUpState} from '../../shared/reducers';
import {AccountApi} from '../../shared/api/core/account.api';

@Injectable()
export class SignupService {
  constructor(private accountApi: AccountApi, private store: Store<any>) {}

  signup(item: any): void {
    this.store.dispatch(SignUpActions.signUpInProgress());
    this.accountApi.signup(item).subscribe(
        res => this.store.dispatch(SignUpActions.signUpSuccess(res)),
        err => this.store.dispatch(SignUpActions.signUpError(err.text())));
  }

  signupStart() { this.store.dispatch(SignUpActions.signUpInit()); }

  getSignUpState(): Observable<SignUpState> { return this.store.let(getSignUpState()); }
}
