import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {Component, OnInit} from '@angular/core';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MdToolbar} from '@angular2-material/toolbar';
import {MdIcon} from '@angular2-material/icon';

import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';


import { RoleRootComponent } from './role';
import { UserRootComponent } from './user';

import {HomeComponent} from './home/index';
import {SignupComponent, LoginComponent, ActivationComponent} from './user-account/index';

@Component({
  moduleId: module.id,
  selector: 'dashboard-app',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
  directives: [ROUTER_DIRECTIVES, MD_SIDENAV_DIRECTIVES, MdToolbar,MdIcon, MD_LIST_DIRECTIVES],
})
@RouteConfig([
  { path: '/', component: HomeComponent, name: 'Home'},
  { path: '/signup', component: SignupComponent, name: 'Signup'},
  { path: '/login', component: LoginComponent, name: 'Login' },
  { path: '/role/...', component: RoleRootComponent, name: 'Role' },
  { path: '/user/...', component: UserRootComponent, name: 'User'},
  { path: '/activate', component: ActivationComponent, name: 'UserActivation'}
])
export class DashboardAppComponent implements OnInit{
  private auth: Observable<any>;
  private authSubscription: Subscription;
  loggedIn = false;
  title = "Application";

  constructor(private store: Store<any>) {
  }

  ngOnInit() {
    this.auth = this.store.select('auth');
    this.store.dispatch({ type: 'INIT' });
    this.authSubscription = this.auth.subscribe(auth => {
        if ( typeof auth !== 'undefined' && auth['token'] ) {
          this.loggedIn = true;
        } else {
          this.loggedIn = false;
        }
    });
  }
}
