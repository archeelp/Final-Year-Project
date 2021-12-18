import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Token } from 'src/app/models/token.model';
import { TokenService } from 'src/app/services/token.service';
import { ContractsService } from 'src/app/services/contracts.service';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css'],
})
export class TokenComponent implements OnInit {
  token: Token;
  balance: number = 0;
  totalSupply: number = 0;
  tokenID: number = 0;

  constructor(
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private contractsService: ContractsService) {

  }

  ngOnInit(): void {
    this.token = this.tokenService.token;
    this.contractsService.getUserBalance(this.tokenID).then((balance: number) => this.balance = balance).catch(console.log);
    this.contractsService.totalSupply(this.tokenID).then((totalSupply: number) => this.totalSupply = totalSupply).catch(console.log);
    this.tokenService.getTokenDetails(
      this.route.snapshot.paramMap.get('id')
    ).subscribe(
      (result) => {
        this.token = new Token().jsobObjectToToken(result['tokenDetails']);
        console.log(`token = ${this.token._id}`);
      },
      (err) => console.log(err)
    );
  }
}
