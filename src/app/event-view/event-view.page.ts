import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, TimeFormat } from '../services/data.service';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.page.html',
  styleUrls: ['./event-view.page.scss'],
})
export class EventViewPage implements OnInit {
  id: number = parseInt(this.activatedRoute.snapshot.paramMap.get('id') as string, 10);
  event$ = this.data.getEventById(this.id);
  Format = TimeFormat;

  constructor(private activatedRoute: ActivatedRoute, private data: DataService) { }

  ngOnInit() {
  }

  toggleDayDisplay(): void {
    this.data.updateEventTimeFormat(this.id);
  }
}
