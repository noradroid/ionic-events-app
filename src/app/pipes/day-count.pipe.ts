import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  standalone: true,
  name: 'dayCount'
})
export class DayCountPipe implements PipeTransform {

  transform(time: Date | string): string {
    const days = moment().add(1, 'day').diff(moment(time), 'days');
    return `Day ${days}`;
  }
}
