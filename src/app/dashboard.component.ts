import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {Component} from '@angular/core';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MdToolbar} from '@angular2-material/toolbar';

import {HomeComponent} from './home/index';
import {SignupComponent, LoginComponent} from './user-account/index';

@Component({
  moduleId: module.id,
  selector: 'dashboard-app',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
  directives: [ROUTER_DIRECTIVES, MD_SIDENAV_DIRECTIVES, MdToolbar]
})
@RouteConfig([
  {path: '/', component: HomeComponent, name: 'Home'},
  {path: '/signup', component: SignupComponent, name: 'Signup'},
  {path: '/login', component: LoginComponent, name: 'Login'}
])
export class DashboardAppComponent {
}
