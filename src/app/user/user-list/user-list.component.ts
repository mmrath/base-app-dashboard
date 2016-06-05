import { Component, OnInit } from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {MdCheckbox} from '@angular2-material/checkbox/checkbox';
import {Observable} from 'rxjs/Observable';

import {UserApi} from '../../shared/api/core/index';
import {Page, User} from '../../shared/models';

@Component({
  moduleId: module.id,
  selector: 'my-app-user-list',
  templateUrl: 'user-list.component.html',
  styleUrls: ['user-list.component.css'],
  directives: [ROUTER_DIRECTIVES,MdCheckbox],
  providers:[UserApi]
})
export class UserListComponent implements OnInit {

  page: Observable<Page<User>>;

  constructor(private userApi:UserApi) {
  }

  ngOnInit() {
    this.page = this.userApi.find();
  }

}
