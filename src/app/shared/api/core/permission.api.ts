import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {PERMISSION_API} from '../../constants/api';
import {Permission, Resource} from '../../models';
import {Observable} from 'rxjs/Observable';
import {Resource as RestResource, GET, ResourceConfig} from '../resource';

@Injectable()
@ResourceConfig({url: PERMISSION_API})
export class PermissionApi extends RestResource<Permission> {
  constructor(http: Http) { super(http); }

  @GET()
  findAllPermissions(): Observable<Array<Permission>> { return null; }

  @GET('/accessLevels')
  findAllAccessLevels(): Observable<Array<string>> { return null; }

  @GET('/resources')
  findAllResources(): Observable<Array<Resource>> { return null; }

  @GET('/groups')
  findAllPermissionGroups(): Observable<Map<string, Map<string, Permission>>> { return null; }
}
