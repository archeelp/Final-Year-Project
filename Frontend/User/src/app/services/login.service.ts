import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  requestUrl = 'http://localhost:3000/auth/signin';
  constructor(private http: HttpClient) { }

  loginUser(email: string, password: string){
    const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const body = {email: email, password: password};
    return this.http.post(this.requestUrl, body, {headers});
  }
}
