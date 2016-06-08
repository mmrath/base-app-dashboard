import {Directive, ChangeDetectorRef, IterableDiffers, ViewContainerRef, TemplateRef, OnChanges} from '@angular/core';

@Directive({
  selector: '[fieldError]',
  inputs: ['fieldError', 'fieldErrorInclude', 'fieldErrorExclude']

})
export class FieldError implements OnChanges {
  private errorDto: any = null;
  private includes: Array<string> = null;
  private excludes: Array<string> = null;

  constructor(
      private _viewContainer: ViewContainerRef, private _templateRef: TemplateRef<any>,
      private _iterableDiffers: IterableDiffers, private _cdr: ChangeDetectorRef) {}


  ngOnChanges() {}
}
