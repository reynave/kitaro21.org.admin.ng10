import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';

declare var $;

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {
  items :any = [];
  constructor(
    
    private http: HttpClient,
    private configService: ConfigService, 
  ) { }

  ngOnInit(): void {
    this.getHttp();
  
  }

  getHttp() {
    this.http.get<any>(environment.api + "transaction/history", {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        console.log(data); 
        this.items =  data['items'];
        $(document).ready(function () {
          $('#example').DataTable({
            lengthMenu: [ 20, 50, 100, 200, 500],
          });
        });
      },
      error => {
        console.log(error);
      },

    );
  }

}
