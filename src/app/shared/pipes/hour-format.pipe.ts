import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hourFormat'
})
export class HourFormatPipe implements PipeTransform {
  transform(value: string | Date, format: string = 'HH:mm'): string {
    if (!value) return '';

    const date = typeof value === 'string' ? new Date(value) : value;
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedHour = format
      .replace('HH', this.pad(hours))
      .replace('mm', this.pad(minutes));

    return formattedHour;
  }

  private pad(n: number): string {
    return n < 10 ? '0' + n : '' + n;
  }
}