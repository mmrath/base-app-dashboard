import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {ROLE_API} from '../../constants/api';
import {Role} from '../../models';
import {
  Resource, BaseUrl,
} from '../resource';

@Injectable()
@BaseUrl(ROLE_API)
export class RoleApi extends Resource<Role> {

  constructor(http: Http) { super(http); }

}
