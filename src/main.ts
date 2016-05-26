import {bootstrap} from '@angular/platform-browser-dynamic';
import {enableProdMode, provide} from '@angular/core';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

import {Http, HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';

import {provideStore} from '@ngrx/store';
import {REDUCERS} from './app/shared/reducers/index';

import {DashboardAppComponent, environment} from './app/';


if (environment.production) {
  enableProdMode();
}

bootstrap(DashboardAppComponent, [
  ...HTTP_PROVIDERS, ...ROUTER_PROVIDERS, provideStore(REDUCERS),
  {provide: LocationStrategy, useClass: HashLocationStrategy}
]);
