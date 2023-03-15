import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  standalone: true,
  name: 'timeFromNow'
})
export class TimeFromNowPipe implements PipeTransform {
  transform(time: Date | string): string {
    return moment(time).fromNow();
  }
}
