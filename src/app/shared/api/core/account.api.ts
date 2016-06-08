import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {SIGNUP_API, ACCOUNT_ACTIVATE_API} from '../../constants/api';
import {ResourceConfig, Resource, GET, Query, POST, Body, MediaType, Produces} from '../resource';


@Injectable()
@ResourceConfig({url: ''})
export class AccountApi extends Resource<any> {
  @GET(ACCOUNT_ACTIVATE_API) @Produces(MediaType.RAW)
  activateAccount(@Query param: {key: string}): Observable<any> { return null; }

  @POST(SIGNUP_API) @Produces(MediaType.RAW)
  signup(@Body body: any): Observable<any> { return null; }
}
