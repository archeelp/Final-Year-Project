import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, 
    private route: ActivatedRoute,
    private loginService: LoginService,
    private userService: UserService) { 
      let dataObject = JSON.parse(sessionStorage.getItem("user"));
      if(dataObject != undefined){
        this.router.navigate(['dashboard']);
      }
    }

  ngOnInit(): void {
  }



  onLoginFormSubmit(form) {
    // validation
    if(form.email == ""){
      alert("Please enter email");
    } else if(form.password == ""){
      alert("Please enter password");
    }
    else if(!this.isEmail(form.email)){
      alert("Please enter a valid email address");
    }
    this.loginService.loginUser(form.email, form.password).subscribe(
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
      (err) => {
        alert(err['error']['error']['message']);
      }
    );
  }

  isEmail(emailAdress): Boolean {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailAdress.match(regexEmail)) {
      return true; 
    } else {
      return false; 
    }
  }
}
