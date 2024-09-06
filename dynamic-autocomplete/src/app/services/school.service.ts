import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import '../models/School';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private http: HttpClient) { }

  listSchools(): Observable<School[]> {
    return this.http.get<School[]>('/schools.json');
  }

  listSchoolByName(val: string) {
    return this.listSchools().pipe(map(
      list => list.filter(v => v.name.toLowerCase().includes(val.toLowerCase()))
    ))
  }

  listSchoolByNameLimited(val: string, limit: number) {
    return this.listSchoolByName(val).pipe(map(list => list.slice(0,5)))
  }
}
