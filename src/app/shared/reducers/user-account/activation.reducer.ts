import {Action, ActionReducer} from '@ngrx/store';
import {ActivationActions} from './activation.actions';


export interface ActivationState {
  inProgress: boolean;
  success: boolean;
  error: any;
}
let initialState: ActivationState = {inProgress: null, success: null, error: null};

export const activationReducer: ActionReducer<any> = (state = initialState, action: Action) => {

  switch (action.type) {
    case ActivationActions.ACTIVATION_SUCCESS:
      return Object.assign({}, {error: null, success: true, inProgress: false});

    case ActivationActions.ACTIVATION_IN_PROGRESS:
      return Object.assign({}, {error: null, success: null, inProgress: true});

    case ActivationActions.ACTIVATION_ERROR:
      return Object.assign({}, {error: action.payload, success: false, inProgress: false});

    default:
      return state;
  }

};
