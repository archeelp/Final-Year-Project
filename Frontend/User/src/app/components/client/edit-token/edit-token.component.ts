import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Token } from 'src/app/models/token.model';
import { User } from 'src/app/models/user.model';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-token',
  templateUrl: './edit-token.component.html',
  styleUrls: ['./edit-token.component.css', '../dashboard/dashboard.component.css']
})
export class EditTokenComponent implements OnInit {

  editTokenForm: FormGroup;
  user: User;
  token: Token;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private tokenService: TokenService) { 
      this.user = this.userService.user;
      this.token = tokenService.token;
      console.log(this.token)
    }

  ngOnInit(): void {
    this.editTokenForm = this.formBuilder.group({
      email: [this.token.email, [, Validators.email]],
      mobile: [this.token.mobile, [, Validators.pattern('[0-9]{10}')]],
      name: [this.token.name, []],
      dateOfBirth: [new Date(this.token.dateOfBirth).toDateString(), []],
      image: ['', [Validators.required]],
      gender: [this.token.gender, []],
      country: [this.token.country, []],
      collegeInfo: [this.token.collegeInfo, []],
      ethereumAddress: [this.token.ethereumAddress, []],
      degreeOfPlay: [this.token.degreeOfPlay, []],
      certificates: ['', [Validators.required]],
      awardsAndAccolades: ['', [Validators.required]],
    });
  }

  get email() {
    return this.editTokenForm.get('email');
  }

  get mobile() {
    return this.editTokenForm.get('mobile');
  }

  get name() {
    return this.editTokenForm.get('name');
  }

  get dateOfBirth() {
    return this.editTokenForm.get('dateOfBirth');
  }

  get image() {
    return this.editTokenForm.get('image');
  }

  get gender() {
    return this.editTokenForm.get('gender');
  }

  get country() {
    return this.editTokenForm.get('country');
  }

  get collegeInfo() {
    return this.editTokenForm.get('collegeInfo');
  }

  get ethereumAddress() {
    return this.editTokenForm.get('ethereumAddress');
  }

  get degreeOfPlay() {
    return this.editTokenForm.get('degreeOfPlay');
  }

  get certificates() {
    return this.editTokenForm.get('certificates');
  }

  get awardsAndAccolades() {
    return this.editTokenForm.get('awardsAndAccolades');
  }

  onEditFormSubmit(): void{
    if(this.editTokenForm.valid){
      this.tokenService.editToken(this.editTokenForm.value, 
        this.userService.user.token).subscribe(
        (result) => {
          console.log(result);
          alert('Token edited successfully');
        },
        (err) => console.log(err)
      );
    } else {
      console.log(this.editTokenForm.errors);
    }
  }

}
