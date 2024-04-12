import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {
  transform(firstname: string, secondname: string): string {
    return `${firstname} ${secondname}`;
  }
}

