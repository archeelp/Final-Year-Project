import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-all-tokens',
  templateUrl: './view-all-tokens.component.html',
  styleUrls: ['./view-all-tokens.component.css']
})
export class ViewAllTokensComponent implements OnInit {
  tokens: Array<Object> = [
    {
      name: "Mark", 
      utility: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      currentPrice: 25.00
    },
    {
      name: "Otto", 
      utility: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      currentPrice: 2.50
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
