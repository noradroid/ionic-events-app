import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { DayCountPipe } from "../pipes/day-count.pipe";
import { DaysFromNowPipe } from "../pipes/days-from-now.pipe";
import { EventViewPageRoutingModule } from "./event-view-routing.module";
import { EventViewPage } from "./event-view.page";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    DaysFromNowPipe,
    DayCountPipe,
    EventViewPageRoutingModule
  ],
  declarations: [EventViewPage]
})
export class EventViewPageModule { }
