import { Pipe, PipeTransform } from '@angular/core';
import { Role } from 'src/app/features/users/enums/role.enum';

@Pipe({
  name: 'role',
})
export class RolePipe implements PipeTransform {
  transform(value: Role): string {
    return Role[value];
  }
}
