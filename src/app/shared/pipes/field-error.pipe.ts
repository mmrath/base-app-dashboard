import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'fieldError'})
export class FieldErrorPipe implements PipeTransform {
  transform(value: any, fieldName: string): string {
    if (typeof value === 'undefined') {
      return '';
    }
    if (Array.isArray(value)) {
      let valueArr = value as Array<any>;
      return this.findErrorFromArray(valueArr, fieldName);
    }else if(Array.isArray(value['fieldErrors'])) {
      let valueArr = value['fieldErrors'] as Array<any>;
      return this.findErrorFromArray(valueArr, fieldName);
    }
    else if (value instanceof Object && value.hasOwnProperty('field') && value['field'] === fieldName) {
      return value.message;
    }
    return '';
  }

  findErrorFromArray(valueArr:Array<any>, fieldName: string){
    let error = valueArr.filter(obj => obj.hasOwnProperty('field') && obj['field'] === fieldName)[0];
    if(error){
      return error.message;
    }
    return null;
  }

}
