import { Component, OnInit } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';

import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  events$!: Observable<Event[]>;

  constructor(private data: DataService) {}

  async ngOnInit(): Promise<void> {
    await this.data.retrieveStore();
    this.events$ = this.data.getEvents();
  }

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }
}
