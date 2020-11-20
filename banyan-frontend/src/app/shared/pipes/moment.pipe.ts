import { Pipe, PipeTransform } from '@angular/core';


declare var moment: any;

@Pipe({name: 'moment'})
export class MomentPipe implements PipeTransform {
  transform(value: number): string {
    return moment(value).format('DD/MM/YYYY');
  }
}