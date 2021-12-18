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
  polls: any;

  constructor(
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private contractsService: ContractsService) {

  }

  ngOnInit(): void {
    // this.token = this.tokenService.token;
    // this.tokenID = this.tokenService.token.tokenIndex;
    this.contractsService.getUserBalance(this.tokenID).then((balance: number) => this.balance = balance).catch(console.log);
    this.contractsService.totalSupply(this.tokenID).then((totalSupply: number) => this.totalSupply = totalSupply).catch(console.log);
    this.contractsService.getPolls(this.tokenID).then((polls: any) => this.polls = polls).catch(console.log).then(() => console.log(this.polls));
    this.tokenService.getTokenDetails(
      this.route.snapshot.paramMap.get('id')
    ).subscribe(
      (result) => {
        this.token = new Token().jsobObjectToToken(result['tokenDetails']);
        console.log(`token index: ${this.token.tokenIndex}`);
        console.log(`token = ${this.token._id}`);
        console.log(this.token)
      },
      (err) => console.log(err)
    );
  }

  buyToken(form: any): void {
    console.log(form)
    this.contractsService
      .buyToken(this.tokenID, form.amount)
      .then((result) => {
        console.log(result);
        this.contractsService.getUserBalance(this.tokenID).then((balance: number) => this.balance = balance).catch(console.log);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  transferToken(form: any): void {
    console.log(form)
    this.contractsService
      .transfer(form.to, this.tokenID, form.amount)
      .then((result) => {
        console.log(result);
        this.contractsService.getUserBalance(this.tokenID).then((balance: number) => this.balance = balance).catch(console.log);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  vote(pollID: string, optionID: string): void {
    this.contractsService
      .vote(this.tokenID, pollID, optionID)
      .then((result) => {
        console.log(result);
        this.contractsService.getPolls(this.tokenID).then((polls: any) => this.polls = polls).catch(console.log).then(() => console.log(this.polls));
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
