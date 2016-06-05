import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AuthApi} from '../../api/core';

import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService{
  constructor(private authApi: AuthApi, private store: Store<any>) {}

  isAuthentcated():Observable<any>{
    return this.authApi.isAuthentcated();
  }
}
