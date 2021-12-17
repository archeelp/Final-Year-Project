import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Token } from 'src/app/models/token.model';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-all-tokens',
  templateUrl: './all-tokens.component.html',
  styleUrls: ['./all-tokens.component.css']
})
export class AllTokensComponent implements OnInit {
  tokens: Token[];

  constructor(private tokenService: TokenService,
    private router: Router) { 
    this.tokens = this.tokenService.getAllTokens();
  }

  ngOnInit(): void {
  }

  showDetails(token: Token): void {
    this.tokenService.token = token;
    this.router.navigate(['token-details'])
  }
}
