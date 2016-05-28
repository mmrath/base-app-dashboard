import {ActionReducer, Action} from '@ngrx/store';

import {Auth} from '../../models';
import {AUTH_TOKEN_KEY, AUTH_USER_KEY} from '../../constants/index';

import {
  LOGIN_SUCCCESS, LOGIN_START, LOGOUT_RECEIVED, LOGIN_FAILURE, LOGIN_TOKEN_EXPIRED
} from './actions';

export const INIT = 'INIT';

let initialState: Auth = { error: undefined, token: undefined, user: undefined };

export const authReducer: ActionReducer<any> = (state = initialState, action: Action = {
  type: INIT
}) => {

  switch (action.type) {
    case LOGIN_SUCCCESS:
      localStorage.setItem(AUTH_TOKEN_KEY, action.payload.id_token);
      localStorage.setItem(AUTH_USER_KEY, action.payload.user);
      return Object.assign(
        {}, state, { token: action.payload.token, user: action.payload.user, error: null });

    case LOGIN_START:
    case LOGOUT_RECEIVED:
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
      return Object.assign({}, initialState);

    case LOGIN_FAILURE:
    case LOGIN_TOKEN_EXPIRED:
      return Object.assign({}, state, { error: action.payload.error, token: null, current: null });

    default:
      return state;
  }

};