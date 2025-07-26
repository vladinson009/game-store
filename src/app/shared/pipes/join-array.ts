import { Pipe, PipeTransform } from '@angular/core';
import { CategoriesFromGame, PlatformsFromGame } from '../../models/game';

@Pipe({
  name: 'join_array',
})
export class JoinArrayPipe implements PipeTransform {
  transform(value: PlatformsFromGame[] | CategoriesFromGame[] | undefined) {
    if (value && Array.isArray(value)) {
      return value.map((el) => el.name).join(', ');
    }
    return '';
  }
}
