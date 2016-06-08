import {Component, OnInit} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {RoleDetailComponent} from './role-detail/role-detail.component';
import {RoleListComponent} from './role-list/role-list.component';

@Component({
  moduleId: module.id,
  selector: 'app-role-root',
  template: '<router-outlet></router-outlet>',
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  {path: '/', name: 'List', component: RoleListComponent, useAsDefault: true},
  {path: '/new', name: 'New', component: RoleDetailComponent, data: {isNew: true}},
  {path: '/:id', name: 'Detail', component: RoleDetailComponent, data: {isNew: false}}
])
export class RoleRootComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
