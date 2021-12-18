import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { baseURL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  requestUrl = `${baseURL}/auth/signin`;
  constructor(private http: HttpClient) { }

  loginUser(email: string, password: string) {
    const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const body = { email: email, password: password };
    return this.http.post(this.requestUrl, body, { headers });
  }
}
