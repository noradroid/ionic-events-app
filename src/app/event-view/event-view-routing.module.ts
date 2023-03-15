import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EventViewPage } from "./event-view.page";

const routes: Routes = [
  {
    path: '',
    component: EventViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventViewPageRoutingModule { }
