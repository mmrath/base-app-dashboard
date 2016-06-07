import {RouteConfig, Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';

import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MdToolbar} from '@angular2-material/toolbar';
import {MdIcon} from '@angular2-material/icon';
import {MdButton} from '@angular2-material/button';

import {Observable} from 'rxjs/Observable';

import {RoleRootComponent} from './role';
import {UserRootComponent} from './user';

import {HomeComponent} from './home/index';
import {SignupComponent, LoginComponent, ActivationComponent} from './user-account/index';
import {AuthService} from './shared/services/core/auth.service';
import {TableModelRootComponent} from "./table-model/table-model-root.component";
import {AuthState} from "./shared/reducers/user-account/auth.reducer";

@Component({
  moduleId: module.id,
  selector: 'dashboard-app',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
  directives: [ROUTER_DIRECTIVES, MD_SIDENAV_DIRECTIVES, MdToolbar, MdIcon, MD_LIST_DIRECTIVES, MdButton],
  providers: [AuthService]
})
@RouteConfig([
  {path: '/', component: HomeComponent, name: 'Home'},
  {path: '/signup', component: SignupComponent, name: 'Signup'},
  {path: '/login', component: LoginComponent, name: 'Login'},
  {path: '/role/...', component: RoleRootComponent, name: 'Role'},
  {path: '/user/...', component: UserRootComponent, name: 'User'},
  {path: '/activate', component: ActivationComponent, name: 'UserActivation'},
  {path: '/table/...', component: TableModelRootComponent, name: 'Table'}
])
export class DashboardAppComponent implements OnInit {
  private auth:Observable<AuthState>;
  title = "Application";

  constructor(private router:Router,private location: Location, private authService:AuthService) {
  }

  ngOnInit() {
    this.auth = this.authService.getAuthState();
    this.authService.checkAuth();
    this.auth.subscribe(authState=>{
      if(!authState.authenticated && !this.authService.isPublicRoute(this.location.path())){
        this.router.navigate(['/Login']);
      }
    })
  }

  logout() {
    this.authService.logout();
  }


}
