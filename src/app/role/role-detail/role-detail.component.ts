import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute,  ROUTER_DIRECTIVES} from '@angular/router';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, Control, ControlGroup, Validators} from '@angular/common';
import {Observable} from 'rxjs/Observable';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MdButton} from '@angular2-material/button';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list/list';
import {MdCheckbox} from '@angular2-material/checkbox/checkbox';
import {RoleApi, PermissionApi} from '../../shared/api/core/index';
import {Role, Permission, Resource} from '../../shared/models';
import {PIPES} from '../../shared/pipes/index';

@Component({
  moduleId: module.id,
  selector: 'my-role-detail',
  providers: [],
  templateUrl: 'role-detail.component.html',
  directives: [
    ROUTER_DIRECTIVES, MdCheckbox, MD_LIST_DIRECTIVES, MD_INPUT_DIRECTIVES, CORE_DIRECTIVES,
    FORM_DIRECTIVES, MdButton
  ],
  pipes: [PIPES]
})
export class RoleDetailComponent implements OnInit {
  isNew: boolean;
  id: number;
  role: Role =
      {id: undefined, name: '', description: '', version: 0, permissions: new Array<Permission>()};

  roleForm: ControlGroup;
  name: Control;
  description: Control;

  accessLevels: Array<string>;
  resources: Array<Resource>;
  permissionGroups: Map<string, Map<string, Permission>>;
  selectAllAccessLevel: Map<string, boolean> = new Map<string, boolean>();
  errorMessages: Array<string> = new Array();


  constructor(
      private roleService: RoleApi, private permissionService: PermissionApi,
      private route: ActivatedRoute, private router: Router) {
    this.name = new Control('', Validators.compose([Validators.required]));
    this.description = new Control('', Validators.compose([Validators.required]));

    this.roleForm = new ControlGroup({
      id: new Control(''),
      name: this.name,
      description: this.description,
      version: new Control('')
    });
  }

  ngOnInit(): void {
    let paramId = this.route.snapshot.params['id'];
    if (typeof paramId === 'undefined' || paramId === 'new' || !paramId) {
      this.isNew = true;
    } else {
      this.isNew = false;
      this.id = +paramId;
    }
    let accessLevelsObs = this.permissionService.findAllAccessLevels();
    let resourcesObs = this.permissionService.findAllResources();
    let permissionGroupsObs = this.permissionService.findAllPermissionGroups();
    accessLevelsObs.subscribe(res => { this.accessLevels = res; });
    resourcesObs.subscribe(
        res => { this.resources = res; }, err => { console.error('Error ' + err); });
    permissionGroupsObs.subscribe(
        res => {
          this.permissionGroups = res;
          console.log('Got all permissions');
          this.updatePermissionSelectStatus();
        },
        err => { console.error('Error permissionGroups' + err); });
    if (!this.isNew) {
      this.roleService.findOne(this.id).subscribe(
          res => {
            console.log('Got role');
            this.role = res;
            this.updatePermissionSelectStatus();
          },
          err => { console.log('Error ' + err); });
    }
  }

  isValidPermission(resourceIn: Resource, accessLevel: string): boolean {
    var returnVal = false;
    if (typeof this.permissionGroups !== 'undefined') {
      if (resourceIn.name in this.permissionGroups) {
        if (accessLevel in this.permissionGroups[resourceIn.name]) {
          returnVal = true;
        }
      }
    }
    return returnVal;
  }

  toggleSelectAllResource(event: Event, accessLevel: string) {
    let selectAll = event['checked'];

    if (typeof this.permissionGroups === 'undefined' || typeof this.resources === 'undefined') {
      return;
    }
    for (var resource of this.resources) {
      if (resource.name in this.permissionGroups &&
          accessLevel in this.permissionGroups[resource.name]) {
        this.permissionGroups[resource.name][accessLevel].selected = selectAll;
      }
    }
  }

  resetSelectAll(event: Event, selectedResource: string, accessLevel: string) {
    let checked = event['checked'];
    if (!checked && this.selectAllAccessLevel[accessLevel]) {
      this.selectAllAccessLevel[accessLevel] = false;
    }
  }

  closeErrorMessage(i: number) { this.errorMessages.splice(i, 1); }

  onSubmit() {
    var selectedPerms = new Array<Permission>();
    for (var resource of this.resources) {
      if (typeof this.permissionGroups !== 'undefined' && resource.name in this.permissionGroups) {
        for (var accessLevel of this.accessLevels) {
          if (accessLevel in this.permissionGroups[resource.name] &&
              this.permissionGroups[resource.name][accessLevel].selected) {
            selectedPerms.push(this.permissionGroups[resource.name][accessLevel]);
          }
        }
      }
    }
    this.role.permissions = selectedPerms;
    this.errorMessages = new Array<string>();
    var obsRole: Observable<Role>;
    if (this.isNew) {
      obsRole = this.roleService.save(this.role);
    } else {
      obsRole = this.roleService.update(this.role.id, this.role);
    }
    obsRole.subscribe(
        res => {
          console.log('Success');
          this.router.navigate(['/role']);
        },
        err => {
          if (typeof err['_body'] !== 'undefined') {
            var body = JSON.parse(err['_body']);
            this.errorMessages = new Array();
            if (typeof body.errors !== 'undefined') {
              for (let error of body.errors) {
                this.errorMessages.push(error.message);
              }
            }
            if (typeof body.fieldErrors !== 'undefined') {
              for (let error of body.fieldErrors) {
                this.errorMessages.push(error.message);
              }
            }
          }
          console.log('Error' + err);
        });
  }

  private updatePermissionSelectStatus() {
    if (typeof this.permissionGroups === 'undefined' ||
        typeof this.role.permissions === 'undefined') {
      console.log('Not updating select status');
      return;
    }
    console.log('Updating select status');
    for (var permission of this.role.permissions) {
      if (permission.resource.name in this.permissionGroups) {
        if (permission.accessLevel in this.permissionGroups[permission.resource.name]) {
          this.permissionGroups[permission.resource.name][permission.accessLevel].selected = true;
        }
      }
    }
  }
}
