import { Component, OnInit } from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

import {UserDetailComponent} from './user-detail';
import {UserListComponent} from './user-list';

@Component({
  moduleId: module.id,
  selector: 'my-app-user-root',
  template: '<router-outlet></router-outlet>',
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: '/', name: 'List', component: UserListComponent, useAsDefault: true },
  { path: '/new', name: 'New', component: UserDetailComponent, data: { isNew: true } },
  { path: '/:id', name: 'Detail', component: UserDetailComponent, data: { isNew: false } }
])
export class UserRootComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
