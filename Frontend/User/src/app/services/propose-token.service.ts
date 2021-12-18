import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseURL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ProposeTokenService {
  requestUrl: string = `${baseURL}/auth/signin`;
  constructor(private http: HttpClient) { }

  proposeToken(jsonObject: object, userToken: string): Observable<object> {
    const headers: HttpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${userToken}`);
    console.log(`Bearer ${userToken}`);
    return this.http.post(this.requestUrl, jsonObject, { headers: headers });
  }
}
