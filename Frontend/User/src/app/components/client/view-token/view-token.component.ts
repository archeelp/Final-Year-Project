import { Token } from '../../../models/token.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { ContractsService } from 'src/app/services/contracts.service';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  pollOptions: Array<string> = [];
  pollForm: FormGroup;
  showToken: boolean;
  balance: number = 0;

  constructor(
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService,
    private contractsService: ContractsService,
    private formBuilder: FormBuilder
  ) {
    this.user = this.userService.user;
  }

  ngOnInit(): void {
    this.tokenService
      .getCreatedToken(this.userService.user.token)
      .subscribe((result) => {
        if (result['token'] == undefined) {
          this.showToken = false;
        } else {
          this.token = new Token().jsobObjectToToken(result['token']);
          this.showToken = true;
        }
      });
    // this.contractsService.getUserBalance(this.token.tokenIndex).then((balance: number) => this.balance = balance).catch(console.log);
    this.pollForm = this.formBuilder.group({
      question: '',
      option: '',
    });
  }

  editToken(): void {
    this.tokenService.token = this.token;
    this.router.navigate(['dashboard/edit-token']);
  }

  addOption(): void {
    this.pollOptions.push(this.pollForm.value.option);
    this.pollForm.patchValue({ option: '' });
  }

  removeOption(): void {
    this.pollOptions.pop();
  }

  createNewPoll(tokenID: number): void {
    // console.log(this.pollOptions);
    // console.log(`ques = ${this.pollForm.value.question}`);
    this.contractsService
      .createPoll(tokenID, this.pollForm.value.question, this.pollOptions)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
        alert('Could not create token');
      });
  }

  disburse(form: any): void {
    this.contractsService
      .disburse(this.token.tokenIndex, form.amountToSend)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
        alert('Could not disburse!');
      });
  }
}
