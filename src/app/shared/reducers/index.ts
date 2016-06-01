import {authReducer} from './user-account/auth.reducer';
import {signupReducer} from './user-account/signup.reducer';
import {activationReducer} from './user-account/activation.reducer';

export const REDUCERS = {
  auth: authReducer,
  signup: signupReducer,
  accountActivation: activationReducer,
};
