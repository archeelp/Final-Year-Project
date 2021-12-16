import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from 'src/app/models/token.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  requestUrl: string = 'http://localhost:3000';
  token: Token;
  constructor(private http: HttpClient) { }

  proposeToken(jsonObject: object, userToken: string): Observable<object> {
    const headers: HttpHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${userToken}`);
    console.log(`Bearer ${userToken}`);
    return this.http.post(`${this.requestUrl}/proposeToken`, jsonObject, { headers: headers });
  }

  editToken(jsonObject: object, userToken: string): Observable<object> {
    const headers: HttpHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${userToken}`);
    return this.http.put(`${this.requestUrl}/editTokenDetails`, jsonObject, { headers: headers });
  }

  getCreatedToken(userToken: string){
    const headers: HttpHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${userToken}`);
    return this.http.get(`${this.requestUrl}/getCreatedToken`, {headers: headers});
  }


}
