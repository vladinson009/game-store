import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';

@Pipe({
  name: 'formatData',
})
export class FormatDataPipe implements PipeTransform {
  transform(value: Date): string {
    if (value) {
      return formatDistanceToNow(value);
    }
    return '';
  }
}
