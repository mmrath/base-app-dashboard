import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';


/**
 * Instead of passing around action string constants and manually recreating
 * action objects at the point of dispatch, we create services encapsulating
 * each appropriate action group. Action types are included as static
 * members and kept next to their action creator. This promotes a
 * uniform interface and single import for appropriate actions
 * within your application components.
 */
@Injectable()
export class ActivationActions {
  static ACTIVATION_IN_PROGRESS = '[UA_ACTIVATION] In progress';

  static activationInProgress(): Action {
    return {
      type: ActivationActions.ACTIVATION_IN_PROGRESS,
    };
  }

  static ACTIVATION_SUCCESS = '[UA_ACTIVATION] Success';

  static activationSuccess(payload?: any): Action {
    return {type: ActivationActions.ACTIVATION_SUCCESS, payload: payload};
  }

  static ACTIVATION_ERROR = '[UA_ACTIVATION] Error';

  static activationError(error: any): Action {
    return {type: ActivationActions.ACTIVATION_ERROR, payload: error};
  }
}
