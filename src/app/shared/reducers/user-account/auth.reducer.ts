import {ActionReducer, Action} from '@ngrx/store';

import {Auth} from '../../models';
import {AUTH_TOKEN_KEY, AUTH_USER_KEY} from '../../constants/index';

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
      let tokenReceived = action.payload.id_token;
      let userReceived = action.payload.user;
      localStorage.setItem(AUTH_TOKEN_KEY, tokenReceived);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(userReceived));
      return Object.assign(
        {}, state, { token: tokenReceived, user: userReceived, error: undefined });

    case LOGIN_START:
    case LOGOUT_RECEIVED:
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
      return {};

    case LOGIN_FAILURE:
    case LOGIN_TOKEN_EXPIRED:
      return Object.assign({}, state, {
        error: action.payload.error, token: undefined, current: undefined
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
        token: localStorage.getItem(AUTH_TOKEN_KEY),
        user: localUser && JSON.parse(localUser)
      });
}
