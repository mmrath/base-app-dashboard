import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {ROLE_API} from '../../constants/api';
import {Role, Page} from '../../models';
import {Observable} from 'rxjs/Observable';
import {
  RestClient, GET, PUT, POST, BaseUrl, Path, Body,
} from '../../utils/rest-client';

@Injectable()
@BaseUrl(ROLE_API)
export class RoleApi extends RestClient {

  constructor(http: Http) { super(http); }

  @GET('/{id}')
  findOne( @Path('id') id: number): Observable<Role> {
    return null;
  }

  @POST()
  save( @Body role: Role): Observable<Role> {
    return null;
  }

  @PUT('/{id}')
  update( @Path('id') id: number, @Body role: Role): Observable<Role> {
    return null;
  }

  @GET()
  findAll(): Observable<Page<Role>> {
    return null;
  }

}
