import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataViewModule } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    DataViewModule,
    RatingModule,
    TagModule,
    ButtonModule,
    DropdownModule,
    InputTextModule
  ]
})
export class PrimesModule { }
