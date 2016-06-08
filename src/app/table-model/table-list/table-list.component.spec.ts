import {beforeEach, beforeEachProviders, describe, expect, it, inject} from '@angular/core/testing';
import {ComponentFixture, TestComponentBuilder} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {TableListComponent} from './table-list.component';

describe('Component: TableList', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [TableListComponent]);
  beforeEach(
      inject([TestComponentBuilder], function(tcb: TestComponentBuilder) { builder = tcb; }));

  it('should inject the component',
     inject([TableListComponent], (component: TableListComponent) => {
       expect(component).toBeTruthy();
     }));

  it('should create the component', inject([], () => {
       return builder.createAsync(TableListComponentTestController)
           .then((fixture: ComponentFixture<any>) => {
             let query = fixture.debugElement.query(By.directive(TableListComponent));
             expect(query).toBeTruthy();
             expect(query.componentInstance).toBeTruthy();
           });
     }));
});

@Component({
  selector: 'test',
  template: `
    <app-table-list></app-table-list>
  `,
  directives: [TableListComponent]
})
class TableListComponentTestController {
}
