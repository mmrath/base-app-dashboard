import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {UserApi} from './user.api';

@Injectable()
export class UserService {
  userApi: UserApi;

  constructor(private http: Http) {
    this.userApi = new UserApi(http);
  }

  findById(id: number) {
    return this.userApi.findOne(id);
  }

  findAll(){
    return this.userApi.findAll();
  }
}
