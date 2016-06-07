import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {
  Resource, GET, ResourceConfig, DefaultHeaders, Query
} from '../resource';
import {TableModel} from '../../models';

@Injectable()
@DefaultHeaders({
  'Accept': 'application/json',
  'Content-Type': 'application/json'
})
@ResourceConfig({url:'/api/table'})
export class TableModelApi extends Resource<TableModel> {

  constructor(http: Http) {
    super(http);
  }

  @GET('/search/table-name')
  getByTableName( @Query name: any): Observable<TableModel> {
    return null;
  }

  @GET('/search/code-name')
  findByCodeName( @Query codeName: any): Observable<TableModel> {
    return null;
  }


}
