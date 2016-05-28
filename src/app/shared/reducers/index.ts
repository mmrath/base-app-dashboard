import {authReducer} from './user-account/auth.reducer';
import {signupReducer} from './user-account/signup.reducer';

export const REDUCERS = {
  auth: authReducer,
  signup: signupReducer,
};
