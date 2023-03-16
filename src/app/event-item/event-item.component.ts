import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DayCountPipe } from '../pipes/day-count.pipe';
import { DaysFromNowPipe } from '../pipes/days-from-now.pipe';
import { FullDatePipe } from '../pipes/full-date.pipe';
import { TimeFromNowPipe } from '../pipes/time-from-now.pipe';
import { Event, TimeFormat } from '../models/event.model';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    TimeFromNowPipe,
    DaysFromNowPipe,
    FullDatePipe,
    DayCountPipe,
  ],
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.scss'],
})
export class EventItemComponent implements OnInit {
  @Input() event!: Event;
  Format = TimeFormat;

  constructor() {}

  ngOnInit() {}
}
