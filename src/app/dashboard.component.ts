import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {Component} from '@angular/core';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list'
import {MdToolbar} from '@angular2-material/toolbar';
import { RoleRootComponent } from './role';
import { UserComponent } from './user';

import {HomeComponent} from './home/index';
import {SignupComponent, LoginComponent} from './user-account/index';

@Component({
  moduleId: module.id,
  selector: 'dashboard-app',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
  directives: [ROUTER_DIRECTIVES, MD_SIDENAV_DIRECTIVES, MdToolbar, MD_LIST_DIRECTIVES],
})
@RouteConfig([
  {path: '/', component: HomeComponent, name: 'Home'},
  {path: '/signup', component: SignupComponent, name: 'Signup'},
  { path: '/login', component: LoginComponent, name: 'Login' },
  { path: '/role/...', component: RoleRootComponent, name: 'Role' },
  { path:  '/user', component: UserComponent, name: 'Name'}
])
export class DashboardAppComponent {
}
