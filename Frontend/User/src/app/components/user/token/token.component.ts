import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Token } from 'src/app/models/token.model';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent implements OnInit {
  token: Token;

  constructor(private route: ActivatedRoute,
    private tokenService: TokenService) { }

  ngOnInit(): void {
    this.token = this.tokenService.token;
  }

  

}
