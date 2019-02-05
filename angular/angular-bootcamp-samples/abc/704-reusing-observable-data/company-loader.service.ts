import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

const API_URL = '/api';

// Or connect to the hosted demo API (works from StackBlitz):
// const API_URL = 'https://api.angularbootcamp.com';

@Injectable({
  providedIn: 'root'
})
export class CompanyLoader {
  constructor(private http: HttpClient) { }

  loadOneCompany() {
    return this.http.get<any[]>(API_URL + '/companies')
      .pipe(map(list => list[0]));
  }
}
