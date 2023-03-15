import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  standalone: true,
  name: 'dateTime'
})
export class DateTimePipe implements PipeTransform {

  transform(time: Date | string): string {
    return moment(time).format("MMMM Do YYYY, hh:mm a");
  }

}
