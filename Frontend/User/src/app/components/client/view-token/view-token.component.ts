import { Token } from '../../../models/token.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { ContractsService } from 'src/app/services/contracts.service';

@Component({
  selector: 'app-view-token',
  templateUrl: './view-token.component.html',
  styleUrls: [
    './view-token.component.css',
    '../dashboard/dashboard.component.css',
  ],
})
export class ViewTokenComponent implements OnInit {
  user: User;
  token: Token;

  constructor(
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService,
    private contractsService: ContractsService
  ) {
    this.user = this.userService.user;
  }

  ngOnInit(): void {
    this.tokenService
      .getCreatedToken(this.userService.user.token)
      .subscribe((result) => {
        this.token = new Token().jsobObjectToToken(result['token']);
      });
  }

  editToken(): void {
    this.tokenService.token = this.token;
    this.router.navigate(['dashboard/edit-token']);
  }

  signOut(): void {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  createNewPoll(
    tokenID: number,
    question: string,
    options: Array<string>
  ): void {
    this.contractsService
      .createPoll(tokenID, question, options)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  disburse(tokenID: number): void {
    this.contractsService
      .disburse(tokenID)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
