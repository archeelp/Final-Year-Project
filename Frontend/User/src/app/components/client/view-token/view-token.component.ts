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
        this.token = new Token().jsobObjectToToken(result['token']);
      });
    this.pollForm = this.formBuilder.group({
      question: '',
      option: ''
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

  addOption(): void{
    this.pollOptions.push(this.pollForm.value.option);
    this.pollForm.patchValue({option: ''});
  }

  removeOption(): void{
    this.pollOptions.splice(this.pollOptions.length - 1, 1);
  }

  createNewPoll(tokenID: number): void {
    console.log(this.pollOptions);
    // this.contractsService
    //   .createPoll(tokenID, form.question, this.pollOptions)
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }

  disburse(form:any, tokenID: number): void {
    this.contractsService
      .disburse(tokenID, form.amountToSend)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
