import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MdToolbar} from '@angular2-material/toolbar';
import {MdIcon} from '@angular2-material/icon';
import {MdButton} from '@angular2-material/button';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './shared/services/core/auth.service';
import {AuthState} from './shared/reducers/user-account/auth.reducer';

@Component({
  moduleId: module.id,
  selector: 'dashboard-app',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
  directives:
      [ROUTER_DIRECTIVES, MD_SIDENAV_DIRECTIVES, MdToolbar, MdIcon, MD_LIST_DIRECTIVES, MdButton],
  providers: [AuthService]
})
export class DashboardAppComponent implements OnInit {
  private auth: Observable<AuthState>;
  title = 'Application';

  constructor(
      private router: Router, private location: Location, private authService: AuthService) {}

  ngOnInit() {
    this.auth = this.authService.getAuthState();
    this.authService.checkAuth();
    this.auth.subscribe(authState => {
      if (!authState.authenticated && !this.authService.isPublicRoute(this.location.path())) {
        this.router.navigate(['/login']);
      }
    });
  }

  logout() { this.authService.logout(); }
}
