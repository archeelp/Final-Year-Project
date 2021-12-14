import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;

  constructor() { 
    let dataObject = JSON.parse(sessionStorage.getItem("user"));
    if(dataObject != undefined){
      this.user = new User().jsonObjectToUser(dataObject);
    }
  }

  setUser(jsonObject: object){
    this.user = new User().jsonObjectToUser(jsonObject);
  }
}
