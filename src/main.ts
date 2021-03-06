import {bootstrap} from '@angular/platform-browser-dynamic';
import {Renderer, enableProdMode, provide} from '@angular/core';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {Http, HTTP_PROVIDERS, XHRBackend, RequestOptions} from '@angular/http';
import {Router, provideRouter, ROUTER_DIRECTIVES} from '@angular/router';
import {provideStore} from '@ngrx/store';
import {OVERLAY_CONTAINER_TOKEN} from '@angular2-material/core/overlay/overlay';
import {MdLiveAnnouncer} from '@angular2-material/core/live-announcer/live-announcer';
import {createOverlayContainer} from '@angular2-material/core/overlay/overlay-container';
import {MdGestureConfig} from '@angular2-material/core/gestures/MdGestureConfig';
import {MdIconRegistry} from '@angular2-material/icon/icon-registry';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {RESOURCE_PROVIDERS} from './app/shared/api';
import {DashboardAppComponent, environment} from './app/index';
import {routes} from './app/routes';
import {REDUCERS} from './app/shared/reducers/index';
import {HttpInterceptor} from './app/shared/api/index';

if (environment.production) {
  enableProdMode();
}

bootstrap(DashboardAppComponent, [
  HTTP_PROVIDERS, MdLiveAnnouncer,
  {provide: OVERLAY_CONTAINER_TOKEN, useValue: createOverlayContainer()}, MdIconRegistry, Renderer,
  {provide: HAMMER_GESTURE_CONFIG, useClass: MdGestureConfig},
  {provide: LocationStrategy, useClass: HashLocationStrategy},
  provide(Http, {
    useFactory: (xhrBackend:XHRBackend, requestOptions:RequestOptions, router:Router) =>
      new HttpInterceptor(xhrBackend, requestOptions, router),
    deps: [XHRBackend, RequestOptions, Router]
  }),
  provideStore(REDUCERS),
  RESOURCE_PROVIDERS,
  provideRouter(routes),
  ...ROUTER_DIRECTIVES,
]);
