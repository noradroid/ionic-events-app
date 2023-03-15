import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

export enum TimeFormat {
  COUNT_DAYS, DAYS_FROM
}

export interface Event {
  fromName: string;
  subject: string;
  date: Date;
  id: number;
  read: boolean;
  timeFormat: TimeFormat;
  description: string;
}

interface NewEventDto {
  name: string;
  description: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private events: Event[] = [
    {
      fromName: 'Matt Chorsey',
      subject: 'Today',
      date: new Date(),
      id: 0,
      read: false,
      timeFormat: TimeFormat.COUNT_DAYS,
      description: "This event contains today's date",
    },
    {
      fromName: 'Matt Chorsey',
      subject: 'Old today',
      date: new Date('March 14, 2023 00:00:00'),
      id: 1,
      read: false,
      timeFormat: TimeFormat.COUNT_DAYS,
      description: "This event contains today's date",
    },
    {
      fromName: 'Lauren Ruthford',
      subject: '30 March 2023',
      date: new Date('March 30, 2023 00:00:00'),
      id: 2,
      read: false,
      timeFormat: TimeFormat.DAYS_FROM,
      description: "This event is for the 2nd last day of the month of march",
    },
    {
      fromName: 'Jordan Firth',
      subject: 'Day 1 of saving for Kaveh',
      date: new Date('November 23, 2022 00:00:00'),
      id: 3,
      read: false,
      timeFormat: TimeFormat.COUNT_DAYS,
      description: "Day X of saving for Kaveh",
    },
    {
      fromName: 'Bill Thomas',
      subject: 'A year ago',
      date: new Date('March 14, 2022 00:00:00'),
      id: 4,
      read: false,
      timeFormat: TimeFormat.DAYS_FROM,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      fromName: 'Joanne Pollan',
      subject: 'My birthday in 2022',
      date: new Date('May 5, 2022 00:00:00'),
      id: 5,
      read: false,
      timeFormat: TimeFormat.COUNT_DAYS,
      description: "Day X of celebrating last year's birthday"
    },
    {
      fromName: 'Andrea Cornerston',
      subject: 'My birthday in 2023',
      date: new Date('May 05, 2023 00:00:00'),
      id: 6,
      read: false,
      timeFormat: TimeFormat.DAYS_FROM,
      description: "Days until this year's birthday",
    },
    {
      fromName: 'Moe Chamont',
      subject: 'Random',
      date: new Date('January 1, 2000 00:00:00'),
      id: 7,
      read: false,
      timeFormat: TimeFormat.COUNT_DAYS,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      fromName: 'Kelly Richardson',
      subject: 'Placeholder Headhots',
      date: new Date('January 1, 2000 00:00:00'),
      id: 8,
      read: false,
      timeFormat: TimeFormat.DAYS_FROM,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      fromName: 'Kelly Richardson',
      subject: 'Placeholder Headhots',
      date: new Date('January 1, 2000 00:00:00'),
      id: 9,
      read: false,
      timeFormat: TimeFormat.COUNT_DAYS,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      fromName: 'Kelly Richardson',
      subject: 'Placeholder Headhots',
      date: new Date('January 1, 2000 00:00:00'),
      id: 10,
      read: false,
      timeFormat: TimeFormat.DAYS_FROM,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    }
  ];

  private eventsSubject: BehaviorSubject<Event[]> = new BehaviorSubject<Event[]>(this.events);
  public events$: Observable<Event[]> = this.eventsSubject.asObservable();

  constructor() {
  }

  public getEvents(): Observable<Event[]> {
    return this.events$;
  }

  public getEventById(id: number): Observable<Event> {
    return this.events$.pipe(map(events => events.find(e => e.id === id) ?? events[0]), tap(events => console.log(events)));
  }

  public addEvent(event: NewEventDto): void {
    this.events.push({
      fromName: 'Random',
      subject: event.name,
      date: this.floorDate(new Date(event.date)),
      id: this.events.length,
      read: false,
      timeFormat: TimeFormat.DAYS_FROM,
      description: event.description,
    });
    this.eventsSubject.next(this.events);
  }

  public updateEventTimeFormat(id: number): void {
    this.events = this.events.map(e => {
      if (e.id === id) {
        return this.toggleEventTimeFormat(e);
      }
      return e;
    });
    this.eventsSubject.next(this.events);
  }

  public floorDate(date: Date): Date {
    date.setHours(0, 0, 0, 0);
    return date;
  }

  private toggleEventTimeFormat(event: Event): Event {
    if (event.timeFormat === TimeFormat.DAYS_FROM) {
      return { ...event, timeFormat: TimeFormat.COUNT_DAYS };
    } else {
      return { ...event, timeFormat: TimeFormat.DAYS_FROM };
    }
  }
}
