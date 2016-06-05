import { Component, OnInit } from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {MdCheckbox} from '@angular2-material/checkbox/checkbox';
import {Observable} from 'rxjs/Observable';


import {RoleApi} from '../../shared/api/core';
import {Page, Role} from '../../shared/models/core';


import {TableModelService} from '../../shared/services';
import {TableModel} from '../../shared/models';
import {DataGridComponent} from '../../shared/components';


@Component({
  moduleId: module.id,
  selector: 'my-app-user-list',
  templateUrl: 'role-list.component.html',
  styleUrls: ['role-list.component.css'],
  directives: [ROUTER_DIRECTIVES,MdCheckbox, DataGridComponent],
  providers:[RoleApi, TableModelService]
})
export class RoleListComponent implements OnInit {

  page: Observable<Page<Role>>;
  tableModel: TableModel;

  constructor(private tableModelService: TableModelService, private roleService:RoleApi) {

  }

  ngOnInit(): void {
    this.page = this.roleService.find();
    console.log('Role list, ng init called');
    this.tableModelService.findByCodeName({codeName:'role'}).subscribe(
      response => {
        this.tableModel = response;
      },
      error => {
        alert(error.text());
        console.log(error.text());
      });
  }

}
