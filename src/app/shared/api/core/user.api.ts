import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {USER_API} from '../../constants/api';
import {User} from '../../models';
import {
  Resource, BaseUrl, DefaultHeaders,
} from '../resource';

@Injectable()
@DefaultHeaders({
  'Accept': 'application/json',
  'Content-Type': 'application/json'
})
@BaseUrl(USER_API)
export class UserApi extends Resource<User> {

  constructor(http: Http) { super(http); }
  
}
