import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-token',
  templateUrl: './view-token.component.html',
  styleUrls: ['./view-token.component.css','../dashboard/dashboard.component.css']
})
export class ViewTokenComponent implements OnInit {
  
  user: User;

  constructor(private router: Router, private userService: UserService) { 
    this.user = this.userService.user;
  }

  ngOnInit(): void {

  }

  editToken(): void {
    this.router.navigate(['dashboard/edit-token']);
  }

  signOut(): void{
    sessionStorage.clear();
    this.router.navigate(['']);
  }

}
