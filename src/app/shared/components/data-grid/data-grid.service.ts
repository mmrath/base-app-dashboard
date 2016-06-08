import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Resource, GET, DELETE, DefaultHeaders, Path, Query, Url, Produces, MediaType} from '../../api/resource';
import {Observable} from 'rxjs/Observable';
import {PageRequest} from '../../models/core';

@Injectable()
@DefaultHeaders({'Accept': 'application/json', 'Content-Type': 'application/json'})
export class DataGridService extends Resource<any> {
  public constructor(protected http: Http) { super(http); }

  @GET('')
  @Produces(MediaType.JSON)
  public getPage(@Url('url') url: string, @Query pageRequest?: PageRequest, @Query search?: any):
      Observable<any> {
    return null;
  }

  @Produces(MediaType.RAW)
  @DELETE('/{id}')
  public deleteById(@Url('url') url: string, @Path('id') id: any): Observable<any> {
    return null;
  }
}
