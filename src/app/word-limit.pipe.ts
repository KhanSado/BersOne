import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitWord' // Verifique se esse nome corresponde ao usado no HTML
})
export class WordLimitPipe implements PipeTransform {
  transform(value: string, limit: number = 20): string {
    if (!value) return '';
    const words = value.split(' ');
    return words.length > limit ? words.slice(0, limit).join(' ') + '...' : value;
  }
}
