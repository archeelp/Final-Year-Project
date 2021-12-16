import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-propose-token',
  templateUrl: './propose-token.component.html',
  styleUrls: ['./propose-token.component.css', '../dashboard/dashboard.component.css']
})
export class ProposeTokenComponent implements OnInit {

  proposeTokenForm: FormGroup;
  user: User;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService) { 
      this.user = this.userService.user;
    }

  ngOnInit(): void {
    this.proposeTokenForm = this.formBuilder.group({
      email: '',
      mobile: '',
      name: '',
      dateOfBirth: '',
      image: '',
      gender: '',
      country: '',
      collegeInfo: '',
      ethereumAddress: '',
      degreeOfPlay: '',
      certificates: '',
      awardsAndAccolades: ''
    });

    this.proposeTokenForm.valueChanges.subscribe(console.log);
  }

  signOut(): void{
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  
}
