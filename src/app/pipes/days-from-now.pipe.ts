import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  standalone: true,
  name: 'daysFromNow'
})
export class DaysFromNowPipe implements PipeTransform {

  transform(time: Date | string): string {
    const daysDiff = moment(time).diff(moment(), 'days');
    if (daysDiff === 0) {
      return 'Today';
    } else if (daysDiff > 0) {
      return `in ${daysDiff} days`;
    } else {
      return `${Math.abs(daysDiff)} days ago`;
    }
  }
}
