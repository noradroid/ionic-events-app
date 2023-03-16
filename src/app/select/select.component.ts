import { CommonModule } from '@angular/common';
import { Component, Input, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent {
  @Input() id = '';
  @Input() values: string[] = [];
  selectedValue: string | undefined;

  onChange(event: any): void {
    this.selectedValue = event.target.value;
  }
}

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [SelectComponent],
  exports: [SelectComponent]
})
export class SelectComponentModule {}
