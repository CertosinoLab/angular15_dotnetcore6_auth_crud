import { Pipe, PipeTransform } from '@angular/core';
import { Utils } from '../utils/utils';

@Pipe({
  name: 'formatColumnName'
})
export class FormatColumnNamePipe implements PipeTransform {

  transform(value: string): string {
    return Utils.formatColumnName(value);
  }

}
