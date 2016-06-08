import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {API_BASE} from '../../constants/api';
import {ResourceConfig, Resource} from '../resource';


@Injectable()
@ResourceConfig({url: API_BASE})
export class AuthApi extends Resource<any> {
  checkAuth(): Observable<any> { return this.http.get('/api/authenticate'); }
}
