import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';

@Injectable()
export class SignUpActions {
  static SIGN_UP_IN_PROGRESS = '[UA_SIGN_UP] In progress';

  static signUpInProgress(): Action {
    return {
      type: SignUpActions.SIGN_UP_IN_PROGRESS,
    };
  }

  static SIGN_UP_SUCCESS = '[UA_SIGN_UP] Success';

  static signUpSuccess(payload?: any): Action {
    return {type: SignUpActions.SIGN_UP_SUCCESS, payload: payload};
  }

  static SIGN_UP_ERROR = '[UA_SIGN_UP] Error';

  static signUpError(error: any): Action {
    return {type: SignUpActions.SIGN_UP_ERROR, payload: error};
  }

  static SIGN_UP_INIT = '[UA_SIGN_UP] Init';

  static signUpInit(): Action { return {type: SignUpActions.SIGN_UP_INIT}; }
}
