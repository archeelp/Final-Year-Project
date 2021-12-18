import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ContractsService } from 'src/app/services/contracts.service';

@Component({
  selector: 'app-token-requests',
  templateUrl: './token-requests.component.html',
  styleUrls: ['./token-requests.component.css']
})
export class TokenRequestsComponent implements OnInit {
  tokens: object[];


  constructor(private http: HttpClient,
    private contractsService: ContractsService) {
    http.get("http://localhost:3000/admin/getTokenRequests").subscribe(
      (result) => {
        this.tokens = result['tokenRequests'];
      }
    );
    contractsService.getUserBalance().then(balance => {
      console.log(balance);
    });
  }

  ngOnInit(): void {

  }

  approve(tokenAdmin: string, amount: string, rate: string, tokenID: string): void {
    this.contractsService.createNewToken(tokenAdmin, amount, rate).then(result => {
      console.log(result);
      // this.http.post(`http://localhost:3000/admin/approveToken/${tokenID}`, {}).subscribe(
      //   (result) => {
      //     console.log(result);
      //     this.tokens = this.tokens.filter(token => token['_id'] !== tokenID);
      //   }
      // );
    }).catch(console.log);
  }

}
