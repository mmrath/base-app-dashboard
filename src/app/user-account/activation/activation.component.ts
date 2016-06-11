import {Component, AfterViewInit} from '@angular/core';
import {Router, ActivatedRoute, ROUTER_DIRECTIVES} from '@angular/router';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {Observable} from 'rxjs/Observable';
import {PIPES} from '../../shared/pipes/index';
import {ActivationService} from './activation.service';
import {LoginComponent} from '../login/login.component';

@Component({
  moduleId: module.id,
  selector: 'app-user-account-activation',
  directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, LoginComponent],
  templateUrl: './activation.component.html',
  providers: [ActivationService],
  pipes: [PIPES]
})
export class ActivationComponent implements AfterViewInit {
  key:string;
  activation:Observable<any>;

  constructor(private route:ActivatedRoute, private router:Router, private activationService:ActivationService) {
    // matrix params of a particular route

    this.activation = this.activationService.getActivationState();
  }

  ngAfterViewInit() {
    this.key = this.route.snapshot.params['key'];
    if (typeof this.key !== 'undefined') {
      this.activationService.activate(this.key);
    }
  }
}
