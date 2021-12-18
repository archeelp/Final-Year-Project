import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-propose-token',
  templateUrl: './propose-token.component.html',
  styleUrls: [
    './propose-token.component.css',
    '../dashboard/dashb\oard.component.css',
  ],
})
export class ProposeTokenComponent implements OnInit {
  proposeTokenForm: FormGroup;
  user: User;
  canPropose: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService
  ) {
    this.user = this.userService.user;
    this.tokenService
      .getCreatedToken(this.userService.user.token)
      .subscribe((result) => {
        if (result['token'] == null) {
          this.canPropose = true;
        } else {
          this.canPropose = false;
        }
      });
  }

  ngOnInit(): void {
    this.proposeTokenForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      name: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      image: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      country: ['', [Validators.required]],
      collegeInfo: ['', [Validators.required]],
      ethereumAddress: ['', [Validators.required]],
      degreeOfPlay: ['', [Validators.required]],
      certificates: ['', [Validators.required]],
      awardsAndAccolades: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      rate: ['', [Validators.required]],
    });
  }

  get email() {
    return this.proposeTokenForm.get('email');
  }

  get mobile() {
    return this.proposeTokenForm.get('mobile');
  }

  get name() {
    return this.proposeTokenForm.get('name');
  }

  get dateOfBirth() {
    return this.proposeTokenForm.get('dateOfBirth');
  }

  get image() {
    return this.proposeTokenForm.get('image');
  }

  get gender() {
    return this.proposeTokenForm.get('gender');
  }

  get country() {
    return this.proposeTokenForm.get('country');
  }

  get collegeInfo() {
    return this.proposeTokenForm.get('collegeInfo');
  }

  get ethereumAddress() {
    return this.proposeTokenForm.get('ethereumAddress');
  }

  get degreeOfPlay() {
    return this.proposeTokenForm.get('degreeOfPlay');
  }

  get certificates() {
    return this.proposeTokenForm.get('certificates');
  }

  get awardsAndAccolades() {
    return this.proposeTokenForm.get('awardsAndAccolades');
  }

  get amount() {
    return this.proposeTokenForm.get('amount');
  }

  get rate() {
    return this.proposeTokenForm.get('rate');
  }

  onProposeFormSubmit(): void {
    if (this.proposeTokenForm.valid) {
      this.tokenService
        .proposeToken(this.proposeTokenForm.value, this.userService.user.token)
        .subscribe(
          (result) => {
            console.log(result);
            this.router.navigate(['dashboard/view-token']);
            alert('Token created successfully');
          },
          (err) => alert(err['error']['message'])
        );
    } else {
      console.log(this.proposeTokenForm.errors);
    }
  }

}
