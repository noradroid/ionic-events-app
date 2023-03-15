import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {
  form!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private data: DataService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      'name': [''],
      'description': [''],
      'date': [(new Date()).toISOString()]
    });
  }

  /**
   * Get date in ISO-8601 format.
   * 
   * @param date date string
   */
  getDate(event: any): void {
    this.form.controls['date'].setValue(event.target.value);
  }

  submit(): void {
    this.data.addEvent(this.form.value);
    this.router.navigate(['home']);
  }
}
