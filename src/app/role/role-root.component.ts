import { Component, OnInit } from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

import {RoleDetailComponent} from './role-detail';
import {RoleListComponent} from './role-list';

@Component({
  moduleId: module.id,
  selector: 'app-role-root',
  template: '<router-outlet></router-outlet>',
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: '/', name: 'RoleList', component: RoleListComponent, useAsDefault: true },
  { path: '/new', name: 'RoleNew', component: RoleDetailComponent, data: { isNew: true } },
  { path: '/:id', name: 'RoleEdit', component: RoleDetailComponent, data: { isNew: false } }
])
export class RoleRootComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

}
