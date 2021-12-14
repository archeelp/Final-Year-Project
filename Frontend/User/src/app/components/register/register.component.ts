import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { RegisterService } from 'src/app/services/register.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  showAthelteForm: Boolean = true;
  constructor(private registerService: RegisterService,
    private userService: UserService,
    private router: Router) {
      let dataObject = JSON.parse(sessionStorage.getItem("user"));
      if(dataObject != undefined){
        this.router.navigate(['dashboard']);
      }
     }

  ngOnInit(): void {
  }

  switchForm(): void {
    this.showAthelteForm = !this.showAthelteForm;
  }

  registerAthlete(form: any){
    console.log(form);
    this.registerService.registerAthlete(
      form.name,
      form.email,
      form.mobile,
      form.password
    ).subscribe(
      (result) => {
        let jsonObject = {
          name: result['user']['name'],
          email: result['user']['email'],
          mobile: result['user']['mobile'],
          token: result['token']}
        this.userService.setUser(jsonObject);
        const userString = JSON.stringify(this.userService.user);
        sessionStorage.setItem('user', userString);
        this.router.navigate(['dashboard']);
      },
      (err) => console.log(err)
    );
  }

}
