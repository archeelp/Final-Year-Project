import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { ActivatedLinkService } from 'src/app/services/activated-link.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  route: string='view-token';
  user: User;
  showToken: boolean;
  constructor(private router: Router,
    private userService: UserService,
    private tokenService: TokenService,
    private activatedLinkService: ActivatedLinkService) { 
    let dataObject = JSON.parse(sessionStorage.getItem("user"));
    if(dataObject == undefined){
      this.router.navigate(['']);
    }
  }

  setRoute(link: string): void {
    this.activatedLinkService.setActivatedLink(link);
    this.route = link;
  }


  ngOnInit(): void {
    this.tokenService
      .getCreatedToken(this.userService.user.token)
      .subscribe((result) => {
        if(result['token'] == undefined){
          this.showToken = false;
        } else {
          if(result['token'].approved)
            this.showToken = true;
        }
      });
    this.route = this.activatedLinkService.activatedLink;
    this.user = this.userService.user;
    console.log(this.showToken)
  }

  signOut(): void {
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}
