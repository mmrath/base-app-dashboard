import {Component, OnInit} from '@angular/core';
import {
  CORE_DIRECTIVES, FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators
} from '@angular/common';
import {Router, RouteParams, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MdButton} from '@angular2-material/button';

import {EMAIL_REGEX_PATTERN, NAME_REGEX_PATTERN, USERNAME_REGEX_PATTERN} from '../../shared/constants/index';

import {Store} from '@ngrx/store';
import {UserService} from '../shared';

@Component({
  moduleId: module.id,
  selector: 'my-app-user-detail',
  templateUrl: 'user-detail.component.html',
  styleUrls: ['user-detail.component.css'],
  directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, MD_INPUT_DIRECTIVES, MdButton],
  providers: [UserService]
})
export class UserDetailComponent implements OnInit {

  isNew:boolean;
  userForm:ControlGroup;
  id:Control;
  username:Control;
  firstName:Control;
  lastName:Control;
  email:Control;
  enabled:Control;
  version:Control;

  constructor(private store:Store<any>, private router:Router, private userService:UserService,
              private builder:FormBuilder,
              private routeParams:RouteParams) {

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
      version: this.version
    });
  }

  ngOnInit() {

    let paramId = this.routeParams.get('id');
    if (typeof paramId === 'undefined' || paramId == 'new') {
      this.isNew = true;
    } else {
      this.isNew = false;
    }

    if (!this.isNew) {
      this.userService.findById(+paramId).subscribe(
        res => {
          this.id.updateValue(res.id);
          this.username.updateValue(res.username);
          this.firstName.updateValue(res.username);
          this.lastName.updateValue(res.lastName);
          this.email.updateValue(res.email);
          this.enabled.updateValue(res.enabled);
          this.version.updateValue(res.version);
        },
        err => {
          console.error(err);
        }
      );
    }
  }

}
