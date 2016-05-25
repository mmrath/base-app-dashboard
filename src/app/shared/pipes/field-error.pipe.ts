import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'fieldError' })
export class FieldErrorPipe implements PipeTransform {
  transform(value: any, fieldName: string): string {
    if (typeof value === 'undefined') {
      return '';
    }
    if ( Array.isArray(value)) {
      let valueArr = value as Array<any>;
      return valueArr.filter(obj => obj.hasOwnProperty('field') && obj['field'] === fieldName)[0].message;
    }else if (value instanceof Object && value.hasOwnProperty('field') && value['field'] === fieldName){
       return value.message;
    }
    return '';
  }
}
