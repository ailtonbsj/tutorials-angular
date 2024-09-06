import { Component, OnInit } from '@angular/core';
import { SchoolService } from './services/school.service';
import { EMPTY, Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  schools$: Observable<School[]> = EMPTY;
  form: FormGroup = <FormGroup>{};

  constructor(
    private schoolService: SchoolService,
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
    this.form = this.fb.group({
      school: ['']
    })
  }

  onKeyUp(e: Event) {
    const val = (<HTMLInputElement>e.target).value;
    console.log(val.length % 3);

    if(val.length % 3 === 0) this.schools$ = this.schoolService.listSchoolByNameLimited(val, 5);
  }

  schoolDisplay() {
    return (data: School) => data.name
  }
}
