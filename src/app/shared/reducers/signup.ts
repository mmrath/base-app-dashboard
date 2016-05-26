import {Action, Reducer} from '@ngrx/store';

export const SIGNUP_IN_PROGRESS = 'SIGNUP_IN_PROGRESS';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const SIGNUP_START = 'SIGNUP_START';

export const INIT = 'INIT';

let initialState: any = {
  error: null,
  inProgress: false,
  success: false,
};

export const signup: Reducer<any> = (state = initialState, action: Action = {
  type: INIT
}) => {

  switch (action.type) {
    case SIGNUP_IN_PROGRESS:
      return Object.assign({}, state, {inProgress: true, success: false, error: null});

    case SIGNUP_SUCCESS:
      return Object.assign({}, {inProgress: false, success: true, error: null});

    case SIGNUP_FAILURE:
      return Object.assign(
          {}, state, {error: action.payload.error, inProgress: false, success: false});

    case SIGNUP_START:
      return Object.assign({}, initialState);
    default:
      return state;
  }

};