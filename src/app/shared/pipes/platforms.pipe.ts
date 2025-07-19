import { Pipe, PipeTransform } from '@angular/core';
import { PlatformData } from '../../models/platform';
import { PlatformsFromGame } from '../../models/game';

@Pipe({
  name: 'platforms',
})
export class PlatformsPipe implements PipeTransform {
  transform(value: PlatformsFromGame[]) {
    if (value) {
      return value.map((el) => el.name).join(' ');
    }
    return '';
  }
}
