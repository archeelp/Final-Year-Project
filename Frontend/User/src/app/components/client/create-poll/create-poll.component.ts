import { Token } from '../../../models/token.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { ContractsService } from 'src/app/services/contracts.service';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: [
    './create-poll.component.css',
    '../dashboard/dashboard.component.css',
  ],
})
export class CreatePollComponent implements OnInit {
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

  ngOnInit(): void {}
  signOut(): void {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  createNewPoll(
    tokenID: string,
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
}
