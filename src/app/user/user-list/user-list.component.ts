import { Component, OnInit } from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {MdCheckbox} from '@angular2-material/checkbox/checkbox';
import {Observable} from 'rxjs/Observable';


import {UserService} from '../shared/user.service';
import {Page, User} from '../../shared/models';


@Component({
  moduleId: module.id,
  selector: 'my-app-user-list',
  templateUrl: 'user-list.component.html',
  styleUrls: ['user-list.component.css'],
  directives: [ROUTER_DIRECTIVES,MdCheckbox],
  providers:[UserService]
})
export class UserListComponent implements OnInit {

  page: Observable<Page<User>>;

  constructor(private userService:UserService) {

  }

  ngOnInit() {
    this.page = this.userService.findAll();
  }

}
