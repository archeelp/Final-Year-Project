import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Token } from 'src/app/models/token.model';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-view-all-tokens',
  templateUrl: './view-all-tokens.component.html',
  styleUrls: ['./view-all-tokens.component.css']
})
export class ViewAllTokensComponent implements OnInit {
  tokens: Token[];
  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    this.tokens = this.tokenService.getAllTokens()
  }

}
