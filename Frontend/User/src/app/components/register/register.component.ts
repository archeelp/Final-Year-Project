import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { ActivatedLinkService } from 'src/app/services/activated-link.service';
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
    private activatedLinkService: ActivatedLinkService,
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

  isValid(form: any): boolean {
    if(form.name.length == 0 || form.email.length == 0 
      || form.password.length == 0 || form.mobile.length == 0){
      alert('All fields are required');
      return false;
    }
    else if(!this.isEmail(form.email)){
      alert('Please enter a valid email address');
      return false;
    }
    else if(form.password.length < 6){
      alert('Password should contain atleast 6 characters');
      return false;
    }
    else if(form.mobile.length != 10){
      alert('Please enter a valid 10 digit phone number');
      return false;
    }
    return true;
  }

  isEmail(emailAdress): Boolean {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailAdress.match(regexEmail)) {
      return true; 
    } else {
      return false; 
    }
  }

  registerAthlete(form: any){
    if(this.isValid(form)){
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
          this.activatedLinkService.setActivatedLink('viewToken');
          this.router.navigate(['dashboard']);
        },
        (err) => console.log(err)
      );
    }
  }

}
