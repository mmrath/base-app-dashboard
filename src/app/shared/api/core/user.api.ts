import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {USER_API} from '../../constants/api';
import {User, Page} from '../../models';
import {Observable} from 'rxjs/Observable';
import {
  RestClient, GET, PUT, POST, BaseUrl, DefaultHeaders, Path, Body,
} from '../../utils/rest-client';

@Injectable()
@DefaultHeaders({
  'Accept': 'application/json',
  'Content-Type': 'application/json'
})
@BaseUrl(USER_API)
export class UserApi extends RestClient {

  constructor(http: Http) { super(http); }

  @GET('/{id}')
  findOne( @Path('id') id: number): Observable<User> {
    return null;
  }

  @POST()
  save( @Body role: User): Observable<User> {
    return null;
  }

  @PUT('/{id}')
  update( @Path('id') id: number, @Body role: User): Observable<User> {
    return null;
  }

  @GET()
  findAll(): Observable<Page<User>> {
    return null;
  }

}
