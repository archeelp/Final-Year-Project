import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  tokenID: string;
  ngOnInit(): void {
    this.tokenID = this.route.snapshot.paramMap.get('tokenID');
  }

  onSave(): void {
    console.log(this.tokenID);
  }

}
