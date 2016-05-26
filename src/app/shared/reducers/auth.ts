import {Action, Reducer} from '@ngrx/store';

import {Auth} from '../models';
import {AUTH_TOKEN_KEY, AUTH_USER_KEY} from '../constants/index';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_IN_PROGRESS = 'LOGIN_IN_PROGRESS';
export const LOGIN_SUCCCESS = 'LOGIN_SUCCCESS';
export const AUTH_TOKEN_EXPIRED = 'AUTH_TOKEN_EXPIRED';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGOUT_IN_PROGRESS = 'LOGOUT_IN_PROGRESS';
export const LOGOUT_RECEIVED = 'LOGOUT_RECEIVED';

export const INIT = 'INIT';

let initialState: Auth = {error: undefined, token: undefined, user: undefined};

export const auth: Reducer<any> = (state = initialState, action: Action = {
  type: INIT
}) => {

  switch (action.type) {
    case LOGIN_SUCCCESS:
      localStorage.setItem(AUTH_TOKEN_KEY, action.payload.id_token);
      localStorage.setItem(AUTH_USER_KEY, action.payload.user);
      return Object.assign(
          {}, state, {token: action.payload.token, user: action.payload.user, error: null});

    case LOGIN_START:
    case LOGOUT_RECEIVED:
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
      return Object.assign({}, initialState);

    case LOGIN_FAILURE:
    case AUTH_TOKEN_EXPIRED:
      return Object.assign({}, state, {error: action.payload.error, token: null, current: null});

    default:
      return state;
  }

};