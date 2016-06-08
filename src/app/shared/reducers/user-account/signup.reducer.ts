import {Action, ActionReducer} from '@ngrx/store';
import {SignUpActions} from './signup.actions';

export const INIT = 'INIT';

export interface SignUpState {
  inProgress: boolean;
  success: boolean;
  error: any;
}
let initialState: SignUpState = {inProgress: null, success: null, error: null};

export const signupReducer: ActionReducer<any> = (state = initialState, action: Action = {
  type: INIT
}) => {

  switch (action.type) {
    case SignUpActions.SIGN_UP_IN_PROGRESS:
      return Object.assign({}, state, {inProgress: true, success: false, error: null});

    case SignUpActions.SIGN_UP_SUCCESS:
      return Object.assign({}, {inProgress: false, success: true, error: null});

    case SignUpActions.SIGN_UP_ERROR:
      return Object.assign(
          {}, state, {error: action.payload.error, inProgress: false, success: false});

    case SignUpActions.SIGN_UP_INIT:
      return Object.assign({}, initialState);
    default:
      return state;
  }

};
