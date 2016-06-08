import {beforeEach, beforeEachProviders, describe, expect, it, inject} from '@angular/core/testing';
import {ComponentFixture, TestComponentBuilder} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {RoleDetailComponent} from './role-detail.component';

describe('Component: RoleDetail', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [RoleDetailComponent]);
  beforeEach(
      inject([TestComponentBuilder], function(tcb: TestComponentBuilder) { builder = tcb; }));

  it('should inject the component',
     inject([RoleDetailComponent], (component: RoleDetailComponent) => {
       expect(component).toBeTruthy();
     }));

  it('should create the component', inject([], () => {
       return builder.createAsync(RoleDetailComponentTestController)
           .then((fixture: ComponentFixture<any>) => {
             let query = fixture.debugElement.query(By.directive(RoleDetailComponent));
             expect(query).toBeTruthy();
             expect(query.componentInstance).toBeTruthy();
           });
     }));
});

@Component({
  selector: 'test',
  template: `
    <app-role-detail></app-role-detail>
  `,
  directives: [RoleDetailComponent]
})
class RoleDetailComponentTestController {
}
