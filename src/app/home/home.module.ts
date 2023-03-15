import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { MessageComponent } from '../message/message.component';
import { EventItemComponent } from '../event-item/event-item.component';
import { TableComponentModule } from '../table/table.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MessageComponent,
    EventItemComponent,
    TableComponentModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
