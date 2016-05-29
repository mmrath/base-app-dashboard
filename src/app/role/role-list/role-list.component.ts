import { Component, OnInit } from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {MdCheckbox} from '@angular2-material/checkbox/checkbox';
import {Observable} from 'rxjs/Observable';


import {RoleService} from '../shared/role.service';
import {Page, Role} from '../../shared/models';


@Component({
  moduleId: module.id,
  selector: 'my-app-user-list',
  templateUrl: 'role-list.component.html',
  styleUrls: ['role-list.component.css'],
  directives: [ROUTER_DIRECTIVES,MdCheckbox],
  providers:[RoleService]
})
export class RoleListComponent implements OnInit {

  page: Observable<Page<Role>>;

  constructor(private roleService:RoleService) {

  }

  ngOnInit() {
    this.page = this.roleService.findAll();
  }

}
