import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, from, map, tap } from 'rxjs';
import { Event, TimeFormat } from '../models/event.model';
import { NewEventDto } from '../models/new-event.model';
import { StorageService } from './storage.service';

const mockEvents: Event[] = [
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
    description: 'This event is for the 2nd last day of the month of march',
  },
  {
    fromName: 'Jordan Firth',
    subject: 'Day 1 of saving for Kaveh',
    date: new Date('November 23, 2022 00:00:00'),
    id: 3,
    read: false,
    timeFormat: TimeFormat.COUNT_DAYS,
    description: 'Day X of saving for Kaveh',
  },
  {
    fromName: 'Bill Thomas',
    subject: 'A year ago',
    date: new Date('March 14, 2022 00:00:00'),
    id: 4,
    read: false,
    timeFormat: TimeFormat.DAYS_FROM,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    fromName: 'Joanne Pollan',
    subject: 'My birthday in 2022',
    date: new Date('May 5, 2022 00:00:00'),
    id: 5,
    read: false,
    timeFormat: TimeFormat.COUNT_DAYS,
    description: "Day X of celebrating last year's birthday",
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
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    fromName: 'Kelly Richardson',
    subject: 'Placeholder Headhots',
    date: new Date('January 1, 2000 00:00:00'),
    id: 8,
    read: false,
    timeFormat: TimeFormat.DAYS_FROM,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    fromName: 'Kelly Richardson',
    subject: 'Placeholder Headhots',
    date: new Date('January 1, 2000 00:00:00'),
    id: 9,
    read: false,
    timeFormat: TimeFormat.COUNT_DAYS,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    fromName: 'Kelly Richardson',
    subject: 'Placeholder Headhots',
    date: new Date('January 1, 2000 00:00:00'),
    id: 10,
    read: false,
    timeFormat: TimeFormat.DAYS_FROM,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
];

@Injectable({
  providedIn: 'root',
})
export class DataService implements OnInit {
  STORE_NAME = 'events';
  private events: Event[] = [];

  private eventsSubject!: BehaviorSubject<Event[]>;
  public events$!: Observable<Event[]>;

  constructor(private storage: StorageService) {}

  async ngOnInit(): Promise<void> {
    await this.retrieveStore();
  }

  public getEvents(): Observable<Event[]> {
    return this.events$;
  }

  public getEventById(id: number): Observable<Event> {
    return this.events$.pipe(
      map((events) => events.find((e) => e.id === id) ?? events[0]),
      tap((events) => console.log(events))
    );
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
    this.updateStore();
  }

  public updateEventTimeFormat(id: number): void {
    this.events = this.events.map((e) => {
      if (e.id === id) {
        return this.toggleEventTimeFormat(e);
      }
      return e;
    });
    this.eventsSubject.next(this.events);
    this.updateStore();
  }

  public floorDate(date: Date): Date {
    date.setHours(0, 0, 0, 0);
    return date;
  }

  public async retrieveStore(): Promise<void> {
    const results = await this.storage.load<Event[]>(this.STORE_NAME);
    this.events = results ?? this.events;
    this.eventsSubject = new BehaviorSubject<Event[]>(this.events);
    this.events$ = this.eventsSubject.asObservable();
    // this.events$ = from(this.storage.load<Event[]>(this.STORE_NAME)).pipe(
    //   map((events) => events ?? []),
    //   tap(() => console.log('loading from storage'))
    // );
  }

  private updateStore(): void {
    this.storage.save(this.STORE_NAME, this.events);
  }

  private toggleEventTimeFormat(event: Event): Event {
    if (event.timeFormat === TimeFormat.DAYS_FROM) {
      return { ...event, timeFormat: TimeFormat.COUNT_DAYS };
    } else {
      return { ...event, timeFormat: TimeFormat.DAYS_FROM };
    }
  }
}
