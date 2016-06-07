import { Component } from '@angular/core';
import {DataGridContainerComponent} from '../../shared/components';


@Component({
  moduleId: module.id,
  selector: 'my-app-role-list',
  templateUrl: 'role-list.component.html',
  directives: [DataGridContainerComponent],
})
export class RoleListComponent {

}
