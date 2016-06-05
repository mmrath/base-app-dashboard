import {ActionReducer, Action} from '@ngrx/store';

import {Auth} from '../../models';
import {AUTH_USER_KEY} from '../../constants/index';

import {
  LOGIN_SUCCCESS, LOGIN_START, LOGOUT_RECEIVED, LOGIN_FAILURE, LOGIN_TOKEN_EXPIRED
} from './actions';

export const INIT = 'INIT';

let initialState: Auth = getStateFromLocalStorage();

export const authReducer: ActionReducer<any> = (state = initialState, action: Action = {
  type: INIT
}) => {

  switch (action.type) {
    case LOGIN_SUCCCESS:
      let userReceived = action.payload;
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(userReceived));
      return Object.assign(
        {}, state, { user: userReceived, error: undefined, success:true });

    case LOGIN_START:
    case LOGOUT_RECEIVED:
      localStorage.removeItem(AUTH_USER_KEY);
      return {};

    case LOGIN_FAILURE:
      localStorage.removeItem(AUTH_USER_KEY);
      return Object.assign({}, {
        error: action.payload.error, success:false
      });
    case LOGIN_TOKEN_EXPIRED:
      localStorage.removeItem(AUTH_USER_KEY);
      return Object.assign({}, state, {
        error: action.payload.error, expired:true, success:false
      });

    case INIT:
      return getStateFromLocalStorage();

    default:
      return getStateFromLocalStorage();
  }

};

function getStateFromLocalStorage(): any{
  let localUser = localStorage.getItem(AUTH_USER_KEY);
  return Object.assign({}, {
        error: undefined,
        user: localUser && JSON.parse(localUser)
      });
}
