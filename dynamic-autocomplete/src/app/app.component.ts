import { Component, inject, OnInit } from '@angular/core';
import { SchoolService } from './services/school.service';
import { Observable, Subject, switchMap } from 'rxjs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatAutocompleteModule, MatInputModule, MatButtonModule, MatIconModule]
})
export class AppComponent implements OnInit {

  private fb = inject(FormBuilder);
  private schoolService = inject(SchoolService);

  form = this.fb.group({
    school: ['']
  });

  output = '';

  /* School Autocomplete Vars */
  schoolsSubject$ = new Subject<string>();
  schools: School[] = [];
  isSchoolsLoading = false;

  schoolSample: School = { code: 'SCH031', name: 'Sample School', disabled: false };

  ngOnInit(): void {

    /* School Autocomplete Init */
    // use debounceTime(1000) before switchMap to avoid several request cancels
    this.schoolsSubject$.asObservable().pipe(switchMap(v => this.schoolsRequest(v)))
      .subscribe({
        next: (v) => {
          this.schools = [...v];
          if(this.schools.length === 0) this.schools.push({ code: '', name: 'Not found any school.', disabled: true });
          this.isSchoolsLoading = false;
        },
        error: (e) => { this.isSchoolsLoading = false }
      });

  }

  /* School Autocomplete Methods */

  schoolsRequest(val: string): Observable<School[]> {
    const limit = 5;
    return this.schoolService.listSchoolByNameLimited(val, limit);
  }

  displayWithSchool() {
    return (entity: School | string) => typeof entity === 'string' ? entity : `${entity.code} - ${entity.name}`;
  }

  onKeyUpAutoSchool(e: KeyboardEvent) {
    const term = (<HTMLInputElement>e.target).value;
    // if(term.length < 3) return;
    this.schoolsSubject$.next(term);
    this.isSchoolsLoading = true;
  }

  clearAutoSchool() {
    this.form.controls.school.reset('');
  }

  getAutoSchool() {
    const entity = this.form.controls.school.value as School | string;
    this.output = typeof entity === 'string' ? entity : `${entity.code} - ${entity.name}`;
  }

  setAutoSchool() {
    this.form.controls.school.setValue(this.schoolSample as any);
  }

}
