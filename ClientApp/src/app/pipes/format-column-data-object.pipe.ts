import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatColumnDataObject'
})
export class FormatColumnDataObjectPipe implements PipeTransform {

  transform(value: any): string {
    if (typeof value === 'object' && value !== null) {
      if(value.hasOwnProperty('fullName'))
        return value.fullName;
    }
    return value;
  }

}
