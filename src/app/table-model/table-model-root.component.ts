import {Component, OnInit} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {TableDetailComponent} from './table-detail/table-detail.component';
import {TableListComponent} from './table-list/table-list.component';

@Component({
  moduleId: module.id,
  selector: 'my-app-table-root',
  template: '<router-outlet></router-outlet>',
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  {path: '/', name: 'List', component: TableListComponent, useAsDefault: true},
  {path: '/new', name: 'New', component: TableDetailComponent, data: {isNew: true}},
  {path: '/:id', name: 'Detail', component: TableDetailComponent, data: {isNew: false}}
])
export class TableModelRootComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
