import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {PERMISSION_API} from '../../constants/api';
import {Permission, Resource} from '../../models';
import {Observable} from 'rxjs/Observable';
import {
  RestClient, GET, BaseUrl
} from '../../utils/rest-client';

@Injectable()
@BaseUrl(PERMISSION_API)
export class PermissionApi extends RestClient {
  constructor(http: Http) { super(http); }

  @GET()
  findAllPermissions(): Observable<Array<Permission>> {
    return null;
  }

  @GET('/accessLevels')
  findAllAccessLevels(): Observable<Array<string>> {
    return null;
  }

  @GET('/resources')
  findAllResources(): Observable<Array<Resource>> {
    return null;
  }

  @GET('/groups')
  findAllPermissionGroups(): Observable<Map<string, Map<string, Permission>>> {
    return null;
  }

}
