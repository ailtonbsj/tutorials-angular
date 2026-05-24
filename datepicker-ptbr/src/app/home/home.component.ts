import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { format } from 'date-fns';

interface Entity {
  date1: Date
  date2: Date
  date3: string
  date4: string
  date5: string
  date6: string
};

@Component({
  selector: 'app-home.component',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  private fb = inject(FormBuilder);

  form = this.fb.group({
    date1: this.fb.control<Date>('' as any, { validators: [Validators.required] }),
    date2: this.fb.control<Date>('' as any),
    date3: this.fb.control<string>('', { validators: [Validators.required] }),
    date4: this.fb.control<string>(''),
    date5: this.fb.control<string>(''),
    date6: this.fb.control<string>('')
  });

  getting() {
    if (this.form.valid) {
      let entity = {} as Entity;
      entity = <Entity>{ ...this.form.value };
      console.log(entity);
    }
  }

  setting() {
    this.form.patchValue({
      date1: new Date('2023-12-31T23:59:01'),
      date2: new Date('2024-11-30T23:59:01'),
      date3: '2025-10-29',
      date4: format(new Date('2026-09-28T23:59:01'), "yyyy-MM-dd"),
      date5: '2027-08-27T23:59:01',
      date6: '2028-01'
    });
  }

}
