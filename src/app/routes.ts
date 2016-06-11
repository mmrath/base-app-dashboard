import {SignupComponent, LoginComponent, ActivationComponent} from './user-account';
import {HomeComponent} from './home';
import {RoleListComponent, RoleDetailComponent} from './role';
import {UserListComponent, UserDetailComponent} from './user';
import {TableListComponent, TableDetailComponent} from './table-model';

export const routes = [
  {path:'/home', component: HomeComponent},
  {path: '/signup', component: SignupComponent},
  {path: '/login', component: LoginComponent},
  {path: '/activate', component: ActivationComponent},

  {path: '/role', component: RoleListComponent},
  {path: '/role/new', component: RoleDetailComponent},
  {path: '/role/edit/:id', component: RoleDetailComponent},

  {path: '/user', component: UserListComponent},
  {path: '/user/new', component: UserDetailComponent},
  {path: '/user/edit/:id', component: UserDetailComponent},

  {path: '/table', component: TableListComponent},
  {path: '/table/new', component: TableDetailComponent},
  {path: '/table/edit/:id', component: TableDetailComponent}

];
