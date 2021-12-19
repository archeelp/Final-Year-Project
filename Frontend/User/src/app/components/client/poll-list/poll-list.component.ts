import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContractsService } from 'src/app/services/contracts.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { Token } from '../../../models/token.model';

@Component({
  selector: 'app-poll-list',
  templateUrl: './poll-list.component.html',
  styleUrls: ['./poll-list.component.css'],
})
export class PollListComponent implements OnInit {
  pollOptions: Array<string> = [];
  pollForm: FormGroup;
  token: Token;
  showToken: boolean;
  polls: any;

  constructor(
    private contractsService: ContractsService,
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private userService: UserService
  ) {}

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
    this.pollForm = this.formBuilder.group({
      question: '',
      option: '',
    });
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
      });
  }
  getPolls(tokenID: number) {
    this.contractsService
      .getPolls(tokenID)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
