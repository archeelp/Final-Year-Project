import { HttpClient } from '@angular/common/http';
import { Token } from "src/app/models/token.model";
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-all-tokens',
  templateUrl: './view-all-tokens.component.html',
  styleUrls: ['./view-all-tokens.component.css','../dashboard/dashboard.component.css']
})
export class ViewAllTokensComponent implements OnInit {
  
  user: User;
  tokens: object[];

  constructor(private router: Router, 
    private userService: UserService,
    private tokenService: TokenService,
    private http: HttpClient) {
    let dataObject = JSON.parse(sessionStorage.getItem("user"));
    if(dataObject == undefined){
      this.router.navigate(['']);
    }else{
      this.user = this.userService.user;
    }
  }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/getAllTokens')
    .subscribe(
      (result) => {
        this.tokens = result['allTokens'];
        console.log(this.tokens);
      },
      (err) => console.log(err)
    );
  }

  editToken(token: Token): void {
    this.tokenService.token = token;
    this.router.navigate(['dashboard/edit-token']);
  }

  signOut(): void{
    sessionStorage.clear();
    this.router.navigate(['']);
  }

}
