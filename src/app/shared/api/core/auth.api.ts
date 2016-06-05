import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class AuthApi {

  constructor(private http: Http) {}

  isAuthentcated():Observable<any>{
    return this.http.get("/api/authenticate");
  }

}
