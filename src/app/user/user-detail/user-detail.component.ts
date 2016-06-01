import {Component, OnInit} from '@angular/core';
import {
  CORE_DIRECTIVES, FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, ControlArray, Validators
} from '@angular/common';
import {Router, RouteParams, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MdButton} from '@angular2-material/button';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MdCheckbox} from '@angular2-material/checkbox/checkbox';
import {PIPES} from '../../shared/pipes/index';
import {Http} from '@angular/http';

import {EMAIL_REGEX_PATTERN, NAME_REGEX_PATTERN, USERNAME_REGEX_PATTERN} from '../../shared/constants/index';

import {Store} from '@ngrx/store';
import {UserApi, RoleApi} from '../../shared/api';
import {Role} from "../../shared/models/core";

@Component({
  moduleId: module.id,
  selector: 'my-app-user-detail',
  templateUrl: 'user-detail.component.html',
  styleUrls: ['user-detail.component.css'],
  directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES,
    MD_INPUT_DIRECTIVES, MD_LIST_DIRECTIVES, MdCheckbox, MdButton],
  providers: [UserApi, RoleApi],
  pipes: [PIPES]
})
export class UserDetailComponent implements OnInit {
  error:any;
  isNew:boolean;
  userForm:ControlGroup;

  allRoles:Array<Role>;

  selectedRoles:Map<number, boolean>;

  id:Control;
  username:Control;
  firstName:Control;
  lastName:Control;
  email:Control;
  enabled:Control;
  version:Control;

  constructor(private store:Store<any>, private userApi:UserApi, private roleApi:RoleApi,
              private http:Http,
              private router:Router,
              private routeParams:RouteParams) {

    this.selectedRoles = new Map<number, boolean>();
    ;

    this.id = new Control('');
    this.username = new Control('',
      Validators.compose([Validators.required, Validators.pattern(USERNAME_REGEX_PATTERN)]));
    this.firstName = new Control('',
      Validators.compose([Validators.required, Validators.pattern(NAME_REGEX_PATTERN), Validators.minLength(2)]));
    this.lastName = new Control('', Validators.pattern(NAME_REGEX_PATTERN));
    this.email = new Control('', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEX_PATTERN)]));
    this.enabled = new Control('');
    this.version = new Control('');

    this.userForm = new ControlGroup({
      id: this.id,
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      enabled: this.enabled,
      version: this.version,
      langKey: new Control('en')
    });
  }

  ngOnInit() {

    let paramId = this.routeParams.get('id');
    if (typeof paramId === 'undefined' || paramId == 'new' || !paramId) {
      this.isNew = true;
    } else {
      this.isNew = false;
    }

    if (!this.isNew) {
      this.roleApi.findAll().subscribe(
        res => {
          this.allRoles = res.content;
          for (let role of this.allRoles) {
            this.selectedRoles[role.id] = false;
          }
        },
        err => {
          this.error = err;
          console.error(err);
        }
      );

      this.userApi.findOne(+paramId).subscribe(
        res => {
          this.id.updateValue(res.id);
          this.username.updateValue(res.username);
          this.firstName.updateValue(res.username);
          this.lastName.updateValue(res.lastName);
          this.email.updateValue(res.email);
          this.enabled.updateValue(res.enabled);
          this.version.updateValue(res.version);
          let control: Control = <Control>this.userForm.find('langKey');
          control.updateValue(res.langKey);

          for (let role of res.roles) {
            this.selectedRoles[role.id] = true;
          }
        },
        err => {
          this.error = err;
          console.error(err);
        }
      );
    }
  }

  onSubmit() {
    if (!this.userForm.valid) {
      return;
    }

    let user = this.userForm.value;
    user.roles = [];
    for (let role of this.allRoles) {
      if (this.selectedRoles[role.id] === true) {
        user.roles.push(role);
      }
    }
    let userObservable;
    if (this.isNew) {
      userObservable = this.http.post('/api/core/users', JSON.stringify(user));
    } else {
      userObservable = this.http.put('/api/core/users/'+user.id, JSON.stringify(user));
    }
    userObservable.subscribe(
      res => {
        this.router.navigate(['/User']);
      },
      err => {
        if (err._body) {
          this.error = JSON.parse(err._body);
        } else {
          this.error = err;
        }
        console.log('Error');
      }
    );
  }

}
