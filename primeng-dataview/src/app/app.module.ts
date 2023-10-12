import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { PrimesModule } from './primes.module';
import { BasicComponent } from './components/basic/basic.component';
import { SortingAndLayoutComponent } from './components/sorting-and-layout/sorting-and-layout.component';
import { TrueListAndFilterComponent } from './components/true-list-and-filter/true-list-and-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicComponent,
    SortingAndLayoutComponent,
    TrueListAndFilterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    PrimesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
