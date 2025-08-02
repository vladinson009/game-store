import type { CategoriesFromGame, PlatformsFromGame } from '../../models/game';

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'join_array',
})
export class JoinArrayPipe implements PipeTransform {
  // Join array pipe to join arrays to string
  transform(value: PlatformsFromGame[] | CategoriesFromGame[] | undefined) {
    if (value && Array.isArray(value)) {
      return value.map((el) => el.name).join(', ');
    }
    return '';
  }
}
