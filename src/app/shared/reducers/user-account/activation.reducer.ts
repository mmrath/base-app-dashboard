import {Action, ActionReducer} from '@ngrx/store';

import {
  USER_ACTIVATION_INIT,
  USER_ACTIVATION_START,
  USER_ACTIVATION_SUCCESS,
  USER_ACTIVATION_ERROR
} from './actions';

let initialState:any = {
  error: undefined,
  success: undefined,
  inProgress: undefined
};

export const activationReducer:ActionReducer<any> = (state = initialState, action:Action = {type: USER_ACTIVATION_INIT}) => {

  switch (action.type) {
    case USER_ACTIVATION_SUCCESS:
      return Object.assign({}, {error: null, success: true, inProgress: false});

    case USER_ACTIVATION_START:
      return Object.assign({}, {error: null, success: null, inProgress: true});

    case USER_ACTIVATION_ERROR:
      return Object.assign({}, {error: action.payload.error, success: false, inProgress: false});

    case USER_ACTIVATION_INIT:
      return Object.assign({}, initialState);

    default:
      return state;
  }

};
