import {bootstrap} from '@angular/platform-browser-dynamic';
import {enableProdMode, provide} from '@angular/core';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

import {Http, HTTP_PROVIDERS, XHRBackend, RequestOptions} from '@angular/http';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';

import {provideStore} from '@ngrx/store';

import {Router} from '@angular/router-deprecated';

import {DashboardAppComponent, environment} from './app/';
import {REDUCERS} from './app/shared/reducers/index';
import {HttpInterceptor} from './app/shared/services/index';

if (environment.production) {
  enableProdMode();
}

bootstrap(DashboardAppComponent, [
  ...HTTP_PROVIDERS, ...ROUTER_PROVIDERS, provideStore(REDUCERS),
  { provide: LocationStrategy, useClass: HashLocationStrategy },
  provide(Http, {
    useFactory: (
      xhrBackend: XHRBackend,
      requestOptions: RequestOptions,
      router: Router) => new HttpInterceptor(xhrBackend, requestOptions, router),
        deps: [XHRBackend, RequestOptions, Router]
    })
]);
