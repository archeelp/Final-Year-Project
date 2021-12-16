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
    http.get("http://localhost:5000/admin/getTokenRequests").subscribe(
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

}
