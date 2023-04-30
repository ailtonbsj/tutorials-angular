import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgxMatTimepickerComponent } from 'ngx-mat-timepicker';

@Component({
  selector: 'app-root',
  template: `
  <h2>Material Timepicker Samples</h2>

  <form [formGroup]="form">
    <mat-form-field>
      <input matInput placeholder="Inicio" formControlName="initTime"
        (blur)="timerPicker.updateTime(form.controls.initTime.value || '')" />
      <ngx-mat-timepicker-toggle matSuffix
        (click)="timerPicker.open(); $event.stopPropagation();"></ngx-mat-timepicker-toggle>
      <mat-hint>HH:mm</mat-hint>

      <mat-error *ngIf="form.controls.initTime.hasError('pattern')">Formato inválido.</mat-error>
      <mat-error *ngIf="form.controls.initTime.hasError('required')">Campo requerido.</mat-error>
    </mat-form-field>

    <ngx-mat-timepicker [format]="24" (timeSet)="setInputTimer($event, timerPicker, form.controls.initTime)" #timerPicker>
    </ngx-mat-timepicker>
    <br><br>
    <button mat-raised-button (click)="submit()">Enviar</button>
    <button mat-raised-button (click)="setInitialValue()">Mudar para 3h30</button>
  </form>
  `,
  styles: []
})
export class AppComponent {
  @ViewChild("timerPicker") timerPicker: NgxMatTimepickerComponent = <NgxMatTimepickerComponent>{};

  form = this.fb.group({
    initTime: ['', [Validators.required, Validators.pattern('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$')]]
  });

  constructor(
    private fb: FormBuilder,
  ){}

  setInputTimer(time: string, timerPicker: NgxMatTimepickerComponent, input: FormControl): void {
    input.setValue(time);
    timerPicker.updateTime(time);    
  }

  setTimerPickerFromInput($ev: Event, timerPicker: NgxMatTimepickerComponent): void {
    timerPicker.updateTime((<HTMLInputElement>$ev.target).value);
  }

  submit() {
    console.log(this.form.controls.initTime.value);
  }

  setInitialValue() {
    this.setInputTimer('03:30', this.timerPicker, this.form.controls.initTime);
  }
}
