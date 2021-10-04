import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';

declare var $;
@Component({
  selector: 'app-account-trading',
  templateUrl: './account-trading.component.html',
  styleUrls: ['./account-trading.component.css']
})
export class AccountTradingComponent implements OnInit {
  items: any = [];
  closed: any = []; 
  constructor(

    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  ngOnInit(): void {
    this.getHttp();

  }

  getHttp() {
    this.http.get<any>(environment.api + "ea/index", {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);

        this.items = data['open'];
        this.closed = data['closed'];
        $(document).ready(function () {
          $('#example').DataTable({
            ordering: false,
            lengthMenu: [50, 100, 200, 500],
          });
          $('#example2').DataTable({
            ordering: false,
            lengthMenu: [50, 100, 200, 500],
          });
        });
      },
      error => {
        console.log(error);
      },

    );
  }

  onApproved(obj, status) {
    console.log(obj);
    if (confirm("Are you sure "+(status == true ? "Approved":"Request Revision")+" this order " + obj.orderCode)) {
      const body = {
        data : obj,
        status : status,
      }
      this.http.post<any>(environment.api + "ea/onApproved",body, {
        headers: this.configService.headers()
      }).subscribe(
        data => {
          console.log(data);
          window.location.reload();
        },
        error => {
          console.log(error);
        },

      );
    }
  }

}
