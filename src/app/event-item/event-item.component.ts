import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DayCountPipe } from '../pipes/day-count.pipe';
import { DaysFromNowPipe } from '../pipes/days-from-now.pipe';
import { DateTimePipe } from '../pipes/date-time.pipe';
import { TimeFromNowPipe } from '../pipes/time-from-now.pipe';
import { Event, TimeFormat } from '../services/data.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    TimeFromNowPipe,
    DaysFromNowPipe,
    DateTimePipe,
    DayCountPipe,
  ],
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.scss'],
})
export class EventItemComponent  implements OnInit {
  @Input() event!: Event;
  Format = TimeFormat;

  constructor() { }

  ngOnInit() {}

}
