import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActivatedLinkService {
  activatedLink: string;

  constructor() { 
    let link = localStorage.getItem("activatedLink");
    if (link === null) {
      this.activatedLink = 'viewToken';
    }
    else{
      this.activatedLink = link;
    }
  }

  setActivatedLink(link: string): void{
    this.activatedLink = link;
    localStorage.setItem('activatedLink', link);
  }

}
