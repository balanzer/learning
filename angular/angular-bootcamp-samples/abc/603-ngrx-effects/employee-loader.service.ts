import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  hours_worked: number;
  hourly_wage: number;
}

const API_URL = '/api';

@Injectable({
  providedIn: 'root'
})
export class EmployeeLoader {
  constructor(private http: HttpClient) { }

  getList(): Observable<Employee[]> {
    return this.http.get<Employee[]>(API_URL + '/employees');
  }
}
