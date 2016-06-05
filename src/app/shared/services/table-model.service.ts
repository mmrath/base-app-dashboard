import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {
  Resource, GET, BaseUrl, DefaultHeaders, Query
} from '../../shared/api/resource';
import {TableModel} from '../../shared/models';

@Injectable()
@DefaultHeaders({
  'Accept': 'application/json',
  'Content-Type': 'application/json'
})
@BaseUrl('/api/table')
export class TableModelService extends Resource<TableModel> {

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
