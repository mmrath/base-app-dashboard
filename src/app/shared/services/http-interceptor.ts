import {
    Http, Request, RequestOptionsArgs, Response, RequestOptions, ConnectionBackend, Headers
} from '@angular/http';
import {Router} from '@angular/router-deprecated';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';

import {AUTH_TOKEN_KEY} from '../constants/index';

export class HttpInterceptor extends Http {

    constructor(
        backend: ConnectionBackend,
        defaultOptions: RequestOptions,
        private router: Router) {
        super(backend, defaultOptions);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.request(url, options));
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.get(url, options));
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.delete(url, options));
    }

    getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        if (!options.headers.has('Content-Type')) {
            options.headers.append('Content-Type', 'application/json');
        }

        if (!options.headers.has('Authorization')) {
            let idToken = localStorage.getItem(AUTH_TOKEN_KEY);
            if (typeof idToken === 'string') {
                options.headers.append('Authorization', 'Bearer ' + idToken);
            }
        }
        return options;
    }

    intercept(observable: Observable<Response>): Observable<Response> {
        return observable.catch((err, source) => {
            if (err.status === 401
                && typeof err.url !== 'undefined'
                && !err.url.endsWith('api/authenticate')) {
                this.router.navigate(['/Login']);
                return Observable.empty();
            } else {
                return Observable.throw(err);
            }
        });
    }
}
/*
bootstrap(MyApp, [
  HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    provide(Http, {
        useFactory: (xhrBackend: XHRBackend, requestOptions: RequestOptions, router: Router) => new HttpInterceptor(xhrBackend, requestOptions, router),
        deps: [XHRBackend, RequestOptions, Router]
    })
])
.catch(err => console.error(err));
*/