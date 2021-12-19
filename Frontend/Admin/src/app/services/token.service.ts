import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from '../constants';
import { Token } from '../models/token.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private http: HttpClient) { }

  // get all tokens - for investors
  getAllTokens(): Token[] {
    let tokens: Token[] = [];
    this.http.get(`${baseURL}/getAllTokens`).subscribe(
      (result) => {
        console;
        let receivedTokens: Array<object> = result['allTokens'];
        receivedTokens.forEach((e) => {
            if(e['approved'] == true){
              tokens.push(new Token().jsobObjectToToken(e));
            }
          }
        );
      },
      (err) => console.log(err)
    );
    return tokens;
  }
}
