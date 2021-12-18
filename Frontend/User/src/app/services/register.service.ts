import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { baseURL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  athleteRequestUrl = `${baseURL}/auth/signup`;
  constructor(private http: HttpClient) { }

  registerAthlete(name: string, email: string, mobile: string, password: string) {
    const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const body = { name: name, email: email, mobile: mobile, password: password };
    return this.http.post(this.athleteRequestUrl, body, { headers });
  }
}
