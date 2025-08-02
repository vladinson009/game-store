import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';

@Pipe({
  name: 'formatData',
})
export class FormatDataPipe implements PipeTransform {
  // Formatting data pipe to showing distance to now

  transform(value: Date): string {
    if (value) {
      return formatDistanceToNow(value);
    }
    return '';
  }
}
