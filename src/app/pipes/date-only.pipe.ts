import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  standalone: true,
  name: 'dateOnly'
})
export class DateOnlyPipe implements PipeTransform {

  transform(time: Date | string): string {
    return moment(time).format("MMMM Do YYYY");
  }

}
